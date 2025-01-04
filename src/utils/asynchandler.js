const asyncHandler = (fun)=> async(req,res,next)=>{

    try {
        await fun(req,res,next)
        
    } catch (error) {
        res.status(error.code || 400).json({msg:"error",success:false})
        
    }

}

export{asyncHandler}