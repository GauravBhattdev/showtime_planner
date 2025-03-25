const {getConcertsByArtistAndCity,getMerchandiseStallsByStallName
    ,getAfterPartiesByCity} = require("../controllers/tourController");
    const axiosInstance = require("../lib/axios.lib")



    jest.mock("../lib/axios.lib.js",()=> ({
        get: jest.fn()
    }))

    describe("Tour Controller tests", ()=> {
        test("should fetch concerts by artist and city  ", async()=> {
            const mockResponse = {
                concerts:[
                    {
                        id: 2,
                        artist: "Beyoncé",
                        venue: "Madison Square Garden",
                        city: "New York",
                        date: "2024-08-15T20:00:00.000Z",
                        ticketPrice: 6127,
                        seatCategory: "Front Row"
                    }  
                ]
            }

            axiosInstance.get.mockResolvedValue(mockResponse);
            const req = {query: {artist:"Beyoncé",city:"New York"}};
            const res = {json:jest.fn(),status:jest.fn(()=>res)};

            await getConcertsByArtistAndCity(req,res);

            expect(axiosInstance.get).toHaveBeenCalledWith(`/concerts/search?artist=Beyoncé&city=New York`);
            expect(res.json).toHaveBeenCalledWith(mockResponse.data);
        });

        //test 2 getMerchandiseStallsByStallName 
        test("should fetch MerchandiseStalls by stallName ", async()=> {
            const mockResponse = {
                MerchandiseStalls:[
                    {
                        "id": 2,
                        "stallName": "Concert Souvenirs",
                        "itemAvailable": "Mugs",
                        "price": 150
                    } 
                ]
            }

            axiosInstance.get.mockResolvedValue(mockResponse);
            const req = {query: {stallName:"Concert Souvenirs"}};
            const res = {json:jest.fn(),status:jest.fn(()=>res)};

            await getMerchandiseStallsByStallName(req,res);

            expect(axiosInstance.get).toHaveBeenCalledWith(`/merchandiseStalls/search?stallName=Concert Souvenirs`);
            expect(res.json).toHaveBeenCalledWith(mockResponse.data);
        })

        //test  getAfterPartiesByCity
        test("should fetch afterParties by city ", async()=> {
            const mockResponse = {
                afterParties:[
                    {
                        "id": 11,
                        "location": "Vortex Club",
                        "city": "Phoenix",
                        "date": "2024-12-11T22:30:00.000Z",
                        "ticketPrice": 800
                    } 
                ]
            }

            axiosInstance.get.mockResolvedValue(mockResponse);
            const req = {query: {city:"Phoenix"}};
            const res = {json:jest.fn(),status:jest.fn(()=>res)};

            await getAfterPartiesByCity(req,res);

            expect(axiosInstance.get).toHaveBeenCalledWith(`/afterParties/search?city=Phoenix`);
            expect(res.json).toHaveBeenCalledWith(mockResponse.data);
        })
    })