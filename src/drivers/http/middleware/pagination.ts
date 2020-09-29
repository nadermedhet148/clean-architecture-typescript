export const pagination = (req , res , next)=>{

    const { limit , skip } = req.query;

    if(!limit || !Number.parseInt(limit)){
        res.status(400).send(`you must send limit in your query`);
    }

    if(!skip || !Number.parseInt(skip)){
        res.status(400).send(`you must send skip in your query`);
    }

    req.pagination = {
        limit : Number.parseInt(limit),
        skip : Number.parseInt(skip),
    };

    next();

}