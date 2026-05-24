const categoryService = require("./categories.service")


// creating a category
exports.createCategory = async (req, res) => {
    try {
        const {category_name, description} = req.body

         // To check if category_name is actually provided
        if (!category_name) {
            return res.status(400).json({
                success: false,
                message: "Category_name is required"
            })
        }

        const category = await categoryService.createCategory(category_name, description)

        res.status(201).json({
            success: true,
            message: "Category Created Successfully",
            data: category
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// Getting all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await categoryService.getCategories()


        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories
        })
    } catch (error) {
        // console.error("Could not get categories!!", error.message)
        res.status(500).json({success: false, message: error.message})
    }
}

// Getting a single category
exports.getCategoryById = async (req, res) => {
    try {
        const {id} = req.params

        const category = await categoryService.getCategoryById(id)

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Category found successfully",
            data: category
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// updating category
exports.updateCategory = async (req, res) => {
    try {
        const {id} = req.params;

        const {category_name, description} = req.body
        const updatedCategory = await categoryService.updateCategory(id, category_name, description)

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: updatedCategory
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// deleting category
exports.deleteCategory = async (req, res) => {
    try {
        const {id} = req.params

        const deletedCategory = await categoryService.deleteCategory(id)

        if (!deletedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        // res.status(200).json({
        //     success: true,
        //     message: "Category deleted successfully",
        //     data: deletedCategory
        // })
        res.status(204).send() // success - No content

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
