"use strict";

let assert = require("chai").assert;
let request = require("supertest-as-promised");
const { User } = require("../../server/models/user");
const { MenuItem } = require("../../server/models/menuItems");
const { menuItemsList } = require("../menuItemsList");
const faker = require("faker");
const { Types } = require("mongoose");

let app = require("../../app");
let _user = "integration_test_" + Math.floor(Date.now() / 1000) + "@alttab.co";

describe("Authentication Controller", () => {
	it("should register a new user and return token", () => {
		let _token = null;

		return request(app)
			.post("/api/register")
			.send({
				email: _user,
				password: "integration",
				name: "Integration Test",
			})
			.expect(201)
			.then((data) => {
				_token = data.body.token;
				assert.ok(_token);
			});
	});

	it("should login existing User", () => {
		let _token = null;
		return request(app)
			.post("/api/login")
			.send({
				email: _user,
				password: "integration",
			})
			.expect(200)
			.then((data) => {
				_token = data.body.token;
				assert.ok(_token);
			});
	});

	it("should return an error bad request if email is used", () => {
		return request(app)
			.post("/api/register")
			.send({
				email: _user,
				password: "integration",
				name: "Integration Test",
			})
			.expect(400);
	});

	it("should return an error bad request if email isn't specified", () => {
		return request(app)
			.post("/api/register")
			.send({
				password: "integration",
				name: "Integration Test",
			})
			.expect(400);
	});

	it("should return an error bad request if password isn't specified", () => {
		return request(app)
			.post("/api/register")
			.send({
				email: _user,
				name: "Integration Test",
			})
			.expect(400);
	});
});

describe("Profile controller", () => {
	let _token = null;

	before(() => {
		return request(app)
			.post("/api/login")
			.send({
				email: _user,
				password: "integration",
			})
			.then((data) => {
				_token = data.body.token;
				assert.ok(_token);
			});
	});

	it("should fetch the profile info of existing user", () => {
		return request(app)
			.get("/api/profile")
			.set("Authorization", "Bearer " + _token)
			.expect(200)
			.then((data) => {
				assert.equal(data.body.email, _user);
			});
	});

	it("should return an error when token is not specified", () => {
		return request(app).get("/api/profile").expect(401);
	});
});

describe("Admin Controller", () => {
	let _token = null;

	before(async () => {
		const admin = await request(app).post("/api/register").send({
			name: faker.name.firstName(),
			email: "admin@admin.com",
			password: "admin",
			isAdmin: true,
		});
		return request(app)
			.post("/api/login")
			.send({
				email: "admin@admin.com",
				password: "admin",
			})
			.then((data) => {
				_token = data.body.token;
				assert.ok(_token);
			});
	});

	it("Admin Should create Users", () => {
		return request(app)
			.post("/api/register")
			.send({
				name: faker.name.firstName(),
				email: faker.internet.email(),
				password: faker.lorem.word(),
			})
			.expect(201);
	});

	it("Admin should Edit Users", async () => {
		let userId = Types.ObjectId().toHexString();

		await request(app).post("/api/register").send({
			_id: userId,
			name: faker.name.firstName(),
			email: faker.internet.email(),
			password: faker.lorem.word(),
		});

		return request(app)
			.put(`/api/edit/${userId}`)
			.set("Authorization", "Bearer " + _token)
			.send({ email: faker.internet.email() })
			.expect(200);
	});

	it("Admin should delete User", async () => {
		let userId = Types.ObjectId().toHexString();

		await request(app).post("/api/register").send({
			_id: userId,
			name: faker.name.firstName(),
			email: faker.internet.email(),
			password: faker.lorem.word(),
		});
		return request(app)
			.delete(`/api/delete/${userId}`)
			.set("Authorization", "Bearer " + _token)
			.expect(204);
	});
});

describe("User Controller", () => {
	let _token = null;

	before(async () => {
		await request(app).post("/api/register").send({
			name: faker.name.firstName(),
			email: "user@user.com",
			password: "userPassword",
		});
		return request(app)
			.post("/api/login")
			.send({
				email: "user@user.com",
				password: "userPassword",
			})
			.then((data) => {
				_token = data.body.token;
				assert.ok(_token);
			});
	});

	it("User can create Account", () => {
		return request(app)
			.post("/api/register")
			.send({
				name: faker.name.firstName(),
				email: faker.internet.email(),
				password: faker.lorem.word(),
			})
			.expect(201);
	});

	it("List all Menu Items", async () => {
		await MenuItem.insertMany(menuItemsList());
		return request(app)
			.get("/api/menuItems")
			.expect(200)
			.then((res) => {
				assert.equal(res.body.data.length, menuItemsList().length);
			});
	});

	it("User Can place Order", async () => {
		const selectedItem = await MenuItem.create(menuItemsList()[0]);
		const orders = {
			ordersList: [{ item: selectedItem._id.toHexString(), numberOfItems: 5 }],
		};
		return request(app)
			.post("/api/placeOrder")
			.set("Authorization", "Bearer " + _token)
			.send({ orders })
			.expect(200);
	});
	after(async function () {
		await User.deleteMany({});
		await MenuItem.deleteMany({});
		process.exit();
	});
});
