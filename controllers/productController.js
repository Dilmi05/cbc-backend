import product from "../models/product.js";    

export async function getProduct(req, res) {
    // Fetch the list of products from the database
    try{
     const productList = await product.find()

     res.json({
        list: productList, // Return the list of products
    });

    } catch (error) {
        res.json({
            message: 'Error fetching products',
        });

    }
}

export function createProduct(req, res) {

    console.log(req.body); // Log the request body for debugging
    if(req.user==null){
         res.json({
            message: "You are not logged in",
        });
        return;
    }

    if(req.user.type!="admin"){
        res.json({
            message: "You are not an admin ",
        });
        return;
    }
    const newProduct = new product(req.body); // Create a new product instance from the request body
    newProduct.save()
        .then(() => {
            res.json({
                message: 'Product created successfully',
            });
        })
        .catch((error) => {
            res.json({
                message: 'Error creating product',
             });
        });
}

export function deleteProduct(req, res) {

    product.deleteOne({ name:req. params.name }).then(() => {
        res.json({
            message: 'Product deleted successfully',
        });
    }).catch((error) => {
        res.json({
            message: 'Error deleting product',
         });
    })
}

export function getproductbyname(req,res){

    
    const name = req.params.name; // Get the product name from the request body
    product.find({ name: name }).then((productList) => {
        if (productList.length > 0) {
            res.json({
                list: productList,
            });
        } else {
            res.json({
                message: 'Product not found',
            });
        }
    }).catch(() => {
        res.json({
            message: 'Error fetching product',
         });
    })
} 