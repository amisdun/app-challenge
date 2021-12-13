const documentExist = async (model, queryData) => {
	const document = await model.findOne(queryData);
	if (!document && !document?._id) {
		throw new Error("Document Does Not Exist");
	}
	return;
};

module.exports = { documentExist };
