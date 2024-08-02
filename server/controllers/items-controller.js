const Item = require("../models/items-model")

const add = async(req,res)=>{
    try {
        const {name,price,category,image_url} = req.body

        const itemExist = await Item.findOne({name})

        if (itemExist){
            return res
            .status(400)
            .json({
                msg:"Item already exists"
            })
        }

        let itemCreated;

        if (image_url){
        itemCreated = await Item.create({name,price,category,image_url})
        }
        else{
        itemCreated = await Item.create({name,price,category})
        }
        
        return res
        .status(200)
        .json({
            msg:"Item successfully added",
            id: itemCreated._id.toString()
        })

    } catch (error) {
        res
        .status(500).
        json({msg:"Error in adding an item", error:error})
    }
}

const fetch = async(req,res)=>{
    try {
        const response = await Item.find({})

       return res
       .status(200)
       .json({response})
    }   
    catch (error) {
        return res
        .status(400)
        .json({msg:"Error in fetching items", error: error})
    }
}

const update = async(req,res)=>{
    try {
        const {name} = req.params
        const {price,category,image_url} = req.body

        const default_img_url = "https://i.pinimg.com/736x/ff/dc/be/ffdcbea5092e55edab36678c1db1586a.jpg"

        const image_url_updated = image_url || default_img_url

        const  itemUpdated = await Item.findOneAndUpdate(
                {name: name},
                {price,category,image_url: image_url_updated},
                {new: true}
            )

        if (!itemUpdated){
            return res
            .status(400)
            .json({msg:"Item not found"})
        }
        return res
        .status(200)
        .json({msg:"successfully updated an item"})

    } catch (error) {
        console.log("Error: ",error.message)
        return res
        .status(500)
        .json({msg:"Error in updating an item"})
    }
}

const remove = async(req,res)=>{
    try {
        const {name} = req.params
        
        const itemRemoved = await Item.findOneAndDelete({name: name})

        if (!itemRemoved){
            return res
            .status(500)
            .json({msg:"Could not find the item"})
        }

        return res
        .status(200)
        .json({msg:"Item has been successfully removed"})

    } catch (error) {
        return res
        .status(500)
        .json({msg:"Error in deleting an item"})
    }
}

module.exports = {add,fetch,update,remove}