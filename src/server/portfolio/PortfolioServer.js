import axios from 'axios';

const createPortfolio = (portfolioForm) => (
    axios.post("/portfolio/createPortfolio",portfolioForm)
);

const getPortfolioByUrl = (url) => (
    axios.get("/portfolio/getPortfolioByUrl",{params:{url:url}})
)

const updatePortfolio = (portfolio) => (
    axios.put("/portfolio/updatePortfolio",portfolio)
)

const getPortfolioDataByMemberNumber = (memberNumber) => (
    axios.get("/portfolio/getPortfolioDataByMemberNumber",{params: {memberNumber: memberNumber}})
)

export {
    createPortfolio,
    getPortfolioByUrl,
    updatePortfolio,
    getPortfolioDataByMemberNumber,
}