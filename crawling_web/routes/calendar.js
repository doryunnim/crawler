const express = require('express');
const router = express.Router();
const Op = require('Sequelize').Op;
const Event = require('../models').Event;
const {Like} = require('../models');

router.post('/add/', async (req, res, next) => {
    try {
        var brand_list = await Like.findAll({
            attributes: ['brand_name'],
            where: {
                user_email: req.body.user_email
            }
        });
        for(var i=brand_list.length; i<100; i++){
            brand_list[i] = "";
        }
        if (brand_list) {
            Event.findAll({
                attributes: ['brand_name', 'title', 'date', ],
                where: {
                    brand_name: [
                        brand_list[0].brand_name,brand_list[1].brand_name,brand_list[2].brand_name,brand_list[3].brand_name,
                        brand_list[4].brand_name,brand_list[5].brand_name,brand_list[6].brand_name,brand_list[7].brand_name,
                        brand_list[8].brand_name,brand_list[9].brand_name,brand_list[10].brand_name,
                    ],
                }
            }).then((data) => {
                return res.json(data);
            })
        } else {
            return;
        }
    } catch (error) {
        console.log(error);
    }
    alert('구글 캘린더에 등록했습니다.')
});

module.exports = router;