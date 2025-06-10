const express = require('express');
const router = express.Router();
const Hostel = require('../models/Hostel');
const Reservation = require('../models/Reservation');

// router.get('/:hostelID', async (req, res) => {
//     try {
//         const hostel = await Hostel.findOne({ hostelID: req.params.hostelID });
//         if (!hostel) {
//             return res.status(404).render('error', { error: 'Hostel not found' });
//         }
        
//         res.render('hostel', { 
//             hostel: hostel,
//             user: req.user // Pass user data if available
//         });
//     } catch (error) {
//         console.error('Error fetching hostel:', error);
//         res.status(500).render('error', { error: 'Server error' });
//     }
// });


// router.get('/:id', async (req, res) => {
//   try {
//       const hostelID = req.params.id;
//       const hostel = await Hostel.findOne({ hostelID: hostelID });
      
//       if (!hostel) {
//           return res.status(404).send('Hostel not found');
//       }
      
//       let hasReservation = false;
//       let reservationAlert = null;

//       // Handle default images
//       if (!hostel.images || !Array.isArray(hostel.images)) {
//           hostel.images = [
//               '/images/default1.jpg',
//               '/images/default2.jpg',
//               '/images/default3.jpg'
//           ];
//       } else if (hostel.images.length < 3) {
//           // Fill with default images if less than 3
//           while (hostel.images.length < 3) {
//               hostel.images.push('/images/default' + (hostel.images.length + 1) + '.jpg');
//           }
//       }
      
//       // REPLACE THIS BLOCK WITH THE NEW CODE
//       if (req.session.user) {
//           const reservation = await Reservation.findOne({
//               $or: [
//                   { userID: req.session.user._id.toString(), hostelID: hostelID.toString() },
//                   { userID: req.session.user._id, hostelID: hostelID } // covers both string and ObjectID cases
//               ]
//           });
//           hasReservation = !!reservation;
          
//           // Debug logs (optional but recommended)
//           console.log('Checking reservation for:');
//           console.log('User ID:', req.session.user._id);
//           console.log('Hostel ID:', hostelID);
//           console.log('Reservation exists:', hasReservation);
//       }
//       // END OF REPLACEMENT BLOCK
      
    
//       res.render('annex', {
//           hostelID: hostelID,
//           hostel: hostel,
//           user: req.session.user || null,
//           hasReservation: hasReservation,
//           reservationAlert: reservationAlert,
//           alertMessage: req.session.alertMessage || null
//       });
//       req.session.alertMessage = null;
//   } catch (error) {
//       console.error('Error fetching hostel details:', error);
//       res.status(500).send('Server error');
//   }
// });


router.get('/:id', async (req, res) => {
    try {
        const hostelID = req.params.id;
        const hostel = await Hostel.findOne({ hostelID: hostelID });
        
        if (!hostel) {
            req.session.alertMessage = "Hostel not found!";
            return res.redirect('/homepage');
        }
        
        // Handle default images
        if (!hostel.images || !Array.isArray(hostel.images)) {
            hostel.images = [
                '/images/default1.jpg',
                '/images/default2.jpg',
                '/images/default3.jpg'
            ];
        } else if (hostel.images.length < 3) {
            while (hostel.images.length < 3) {
                hostel.images.push('/images/default' + (hostel.images.length + 1) + '.jpg');
            }
        }
        
        let hasActiveReservation = false;
        let user = null;
        
        if (req.session.user) {
            user = req.session.user;
            const reservation = await Reservation.findOne({
                userId: user._id,
                hostelId: hostelID,
                status: { $in: ['pending', 'confirmed'] }
            });
            hasActiveReservation = !!reservation;
        }
        
        res.render('annex', {
            hostelID: hostelID,
            hostel: hostel,
            user: user, // Explicitly pass user or null
            hasReservation: hasActiveReservation,
            alertMessage: req.session.alertMessage || null
        });
        
        // Clear the alert message after displaying it
        req.session.alertMessage = null;
        
    } catch (error) {
        console.error('Error fetching hostel details:', error);
        req.session.alertMessage = "Error loading hostel details";
        res.redirect('/homepage');
    }
});

// router.get('/:id', async (req, res) => {
//     try {
//         const hostelID = req.params.id;
//         const hostel = await Hostel.findOne({ hostelID: hostelID });
        
//         if (!hostel) {
//             req.session.alertMessage = "Hostel not found!";
//             return res.redirect('/homepage');
//         }
        
//         // Handle default images
//         if (!hostel.images || !Array.isArray(hostel.images)) {
//             hostel.images = [
//                 '/images/default1.jpg',
//                 '/images/default2.jpg',
//                 '/images/default3.jpg'
//             ];
//         } else if (hostel.images.length < 3) {
//             while (hostel.images.length < 3) {
//                 hostel.images.push('/images/default' + (hostel.images.length + 1) + '.jpg');
//             }
//         }
        
//         let hasActiveReservation = false;
//         if (req.session.user) {
//             const reservation = await Reservation.findOne({
//                 userId: req.session.user._id,
//                 hostelId: hostelID,
//                 status: { $in: ['pending', 'confirmed'] } // Only check active reservations
//             });
//             hasActiveReservation = !!reservation;
//         }
        
//         res.render('annex', {
//             hostelID: hostelID,
//             hostel: hostel,
//             user: req.session.user || null,
//             hasReservation: hasActiveReservation,
//             alertMessage: req.session.alertMessage || null
//         });
        
//         // Clear the alert message after displaying it
//         req.session.alertMessage = null;
        
//     } catch (error) {
//         console.error('Error fetching hostel details:', error);
//         req.session.alertMessage = "Error loading hostel details";
//         res.redirect('/homepage');
//     }
// });

module.exports = router;