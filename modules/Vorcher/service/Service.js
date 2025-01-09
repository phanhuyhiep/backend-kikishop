import Vorcher from "../model/Vorcher.js"
export const createVorchers = async (req) => {
    const vorcher = await Vorcher.create({
        ...req.body
    })
    return vorcher;
}

export const getAllVorchers = async () => {
    const vorcher = await Vorcher.find()
    return vorcher
}

export const deleteVorchers = async (req) => {
    const remove = await Vorcher.findByIdAndDelete(req.params.id)
    return remove
}

export const updateVorchers = async (req) => {
    const id = req.params.id
    const update = await Vorcher.updateOne({
        _id: id
    },
        {
            ...req.body
        }
    )
    return update
}
export const searchVoucher = async (req, res) => {
    const { code } = req.query;
    const searchRegex = new RegExp(code, "i");
    const vouchers = await Vorcher.find({ code: searchRegex });
    return vouchers
};