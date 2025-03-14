const { v4: uuidv4 } = require("uuid");
const { create, getById, getAll } = require("../repositories/supplierRepository");

const createSupplier = async (data) => {
    const supplier = {
        supplierId: uuidv4(), // Genera un ID único
        name: data.name,
        email: data.email,
        phone: data.phone,
        location: data.location,
        createdAt: new Date().toISOString(),
    };
    return await create(supplier);
}

const getSupplierById = async (supplierId) => {
    return await getById(supplierId);
}

const getAllSuppliers = async () => {
    return await getAll();
}

module.exports = {
    createSupplier,
    getSupplierById,
    getAllSuppliers,
};