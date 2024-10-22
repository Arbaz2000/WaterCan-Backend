const express = require('express');
const router = express.Router();
const {createRoute,getRouteById,updateRouteWithCustomers,getDriverAdmin,getRoutes,getRouteAndCustomerForDriver, updateRouteWithCustomersFromAdmin, routesGet, routesUpdate} = require('../controllers/routeController');

// Create a new customer
router.post('/route', createRoute);
// get route for admin display
router.post('/get-route',getRoutes);
router.post('/routesUpdate/:id',routesUpdate);
router.get('/getroute/:id',routesGet);
router.put('/update-route/:routeId',updateRouteWithCustomersFromAdmin);
// route.get('/route/:id',getRouteById);
router.get('/get-all-admin-assigned/to/:driverId',getDriverAdmin)
router.post('/add-customer/to/:adminId/:routeId',updateRouteWithCustomers)
//get route for given driverId

router.get('/route/:driverId',getRouteAndCustomerForDriver)


module.exports = router;
