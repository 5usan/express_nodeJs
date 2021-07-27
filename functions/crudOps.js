const create = async (createSchema, param) => {
  try {
    console.log("inside create function");
    const newCreate = new createSchema(param);
    const createData = await newCreate.save();
    return createData;
  } catch {
    return {};
  }
};

// module.exports = create;

const read = async (readSchema) => {
  try {
    const newRead = await readSchema.find();
    return newRead;
  } catch (error) {
    return {};
  }
};

const update = async (updateSchema, param, data) => {
  try {
    const newUpdate = await updateSchema.findByIdAndUpdate(
      { _id: param },
      { $set: data }
    );
    return newUpdate;
  } catch (error) {
    return {};
  }
};

const destroy = async (deleteSchema, param) => {
  try {
    console.log(param, "param");
    const newDelete = await deleteSchema.findByIdAndDelete({ _id: param });
    return newDelete;
  } catch (error) {
    return {};
  }
};

module.exports = { create, read, update, destroy };
