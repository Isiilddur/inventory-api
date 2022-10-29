'use strict'

import productService from "../services/product.service";
/**
 * @author Luis Montes
 *
 */
const createProduct = async (req: any, res: any) => {
    try {
        let result = await productService.createProduct(req.body)
        res.status(200).send(result)
    } catch (error) {
        res.status(400).json(error)
    }
    
}

const updateProduct = async (req: any, res: any) => {
    let result = await productService.updateProduct(req.body)
    res.status(200).send(result)
}

const deleteProduct = async (req: any, res: any) => {
    let result = await productService.deleteProduct(req.params)
    res.status(200).send(result)
}

const findProduct = async (req: any, res: any) => {
    let result = await productService.findProduct(req.params)
    res.status(200).send(result)
}

const listProducts = async (req: any, res: any) => {
    console.log(req);
    
    let result = await productService.listProducts(req.query)
    res.status(200).send(result)
}



export default {
    createProduct,
    updateProduct,
    findProduct,
    listProducts,
    deleteProduct,
    
}