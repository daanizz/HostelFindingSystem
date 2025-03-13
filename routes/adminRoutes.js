const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.post('/addHostel', adminController.addHostel); // POST request for adding Hostel
router.get('/getHostel', adminController.getHostel);
router.get('/getReserves', adminController.getReserves);
router.post('/updateStatus', adminController.updateStatus);
router.post('/delete/:id', adminController.deleteHostel);
router.post('/deleteRes/:id', adminController.deleteReservation);

router.get('/dashboard', (req,res) =>{
  res.render('admin/dashboard');
});

router.get('/hosteladder',(req,res) => {
  res.render('/admin/addHostel');
});

router.get('/', (req,res) => {
  res.render('admin/dashboard');
});

module.exports = router;