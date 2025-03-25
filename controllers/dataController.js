const {concert: concertModel,
    afterPartie:afterPartieModel,
    tour:tourModel,
    tourItem:tourItemModel,
    merchandiseStall:merchandiseStallModel
} = require('../models')


const createTour = async (req, res)=> {
    try{
      const { concerts, afterParties, merchandiseStalls, name} = req.body;
      const newTour = await tourModel.create({name});

      if(concerts && concerts.length > 0){
        for (const concert of concerts){
            const savedConcert = await concertModel.create(concert);

            await tourItemModel.create({
                tourId: newTour.id,
                itemId:savedConcert.id,
                type:"concert"
            })
        }
      }


      if(afterParties && afterParties.length > 0){
        for (const afterPartie of afterParties){
            const savedAfterPartie = await afterPartieModel.create(afterPartie);

            await tourItemModel.create({
                tourId: newTour.id,
                itemId:savedAfterPartie.id,
                type:"afterPartie"
            })
        }
      }


      if(merchandiseStalls && merchandiseStalls.length > 0){
        for (const merchandiseStall of merchandiseStalls){
            const savedMerchandiseStall = await merchandiseStallModel.create(merchandiseStall);

            await tourItemModel.create({
                tourId: newTour.id,
                itemId:savedMerchandiseStall.id,
                type:"merchandiseStall"
            })
        }
      };
      res.status(201).json({message:"tour Created", tour:newTour})
    }catch(error){
        console.error(error)
        res.status(500).json({error: "Failed to create tour"})
    }
};


const getTour = async (req, res)=> {
    try{
        const tour = await tourModel.findByPk(req.params.id);
        if(!tour){
            return res.status(404).json({error: "tour not found"})
        }
        const items = await tourItemModel.findAll({
            where:{tourId: tour.id}
        })

         const concerts = []
         const afterParties = []
         const merchandiseStalls = []


         for(const item of items){
            if(item.type==="concert"){
                const   concert = await concertModel.findByPk(item.itemId)

                if(concert) concerts.push(concert)
            }
         else if(item.type === "afterPartie"){
            const   afterPartie = await afterPartieModel.findByPk(item.itemId)

            if(afterPartie) afterParties.push(afterPartie)
             
            }else{
                const  merchandiseStall = await merchandiseStallModel.findByPk(item.itemId)

            if(merchandiseStall) merchandiseStalls.push(merchandiseStall)

            }
         }
          res.json({
            tour,
            concerts,
            afterParties,
            merchandiseStalls
          });
    }  catch(error){
      console.error(error)
      res.status(500).json({error:"failed to retreieve tour"})

    }
}


module.exports = { createTour, getTour}




