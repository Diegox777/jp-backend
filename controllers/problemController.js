const models = require('../models');
const Problem = models.problem;
const { paginate } = require('../utils/paginate');

const getProblems = async (req, res, next) => {
    const page = req.query.page;
    const pageSize = req.query.per_page;

    try {
        const { count, rows } = await Problem.findAndCountAll({
            where: {},
            ...paginate({ page, pageSize })
        });
        res.status(200).send({
            data: rows,
            page: page,
            totalCount: count
        });
    } catch (error) {
        res.status(500).json({
            error: 'Something went wrong'
        });
    }
} 

const createProblem = async (req, res, next) => {
    
    const problem = {
        title: req.body.title,
        author: req.body.author,

    }
}

module.exports = {
    getProblems,
    createProblem
}