import { 
    getAllRoutes,
    getListOfRegions,
    getListOfSeasons,
    getRoutesByRegion,
    getRoutesBySeason,
} from '../../models/model.js';

export default async (req, res) => {
    const region = req.query.region;
    const season = req.query.season;

    let routes;
    if (region === undefined && season === undefined) {
        routes = await getAllRoutes();
    }
    else if (region !== undefined && season === undefined) {
        routes = await getRoutesByRegion(region);
    }
    else if (region === undefined && season !== undefined) {
        routes = await getRoutesBySeason(season);
    }
    else {
        routes = await getRoutesByRegion(region);
        routes = routes.filter(r => r.bestSeason === season);
    }

    const regions = await getListOfRegions();
    const seasons = await getListOfSeasons();

    res.render('routes/list', { 
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons
    });
};