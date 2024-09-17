module.exports = (req,res,err) => {
    console.error(err);
    res.status(500).send('Internal server Error...');
}