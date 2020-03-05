const db = require('../models');
const Problem = db.problem;

const getProblems = async (req, res, next) => {
    try {
        const problems = await Problem.findAll();
        res.status(200).send({
            problems
        });
    } catch (error) {
        res.status(500).json({
            error: 'Something went wrong'
        });
    }
} 

module.exports = {
    getProblems
}