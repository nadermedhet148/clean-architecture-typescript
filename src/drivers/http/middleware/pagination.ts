export const pagination = (req , res , next)=>{

    const { limit , skip } = req.query;

    if(!limit || !Number.parseInt(limit)){
        res.status(400).send(`you must send limit in your query`);
    }

 

    req.pagination = {
        limit : Number.parseInt(limit),
        skip : Number.parseInt(skip) || 0,
    };

    next();

}