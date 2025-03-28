const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const sinon = require('sinon');
const { expect } = chai;
const Hotel = require('../models/Hotel');
const { getHotels, getHotelById, createHotel, updateHotel, deleteHotel } = require('../controllers/HotelController');

chai.use(chaiHttp);

describe('Hotel Controller Tests', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('GetHotels Function Test', () => {
        it('should return all hotels', async () => {
            const hotels = [
                { _id: new mongoose.Types.ObjectId(), name: 'Hotel 1' },
                { _id: new mongoose.Types.ObjectId(), name: 'Hotel 2' }
            ];

            const findStub = sinon.stub(Hotel, 'find').resolves(hotels);
            const req = {};
            const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

            await getHotels(req, res);

            expect(findStub.calledOnce).to.be.true;
            expect(res.json.calledWith(hotels)).to.be.true;
        });

        it('should return 500 on error', async () => {
            const findStub = sinon.stub(Hotel, 'find').throws(new Error('DB Error'));
            const req = {};
            const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

            await getHotels(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;
        });
    });

    describe('GetHotelById Function Test', () => {
        it('should return a hotel by ID', async () => {
            const hotel = { _id: new mongoose.Types.ObjectId(), name: 'Hotel 1' };
            const findByIdStub = sinon.stub(Hotel, 'findById').resolves(hotel);
            const req = { params: { id: hotel._id } };
            const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

            await getHotelById(req, res);

            expect(findByIdStub.calledOnceWith(hotel._id)).to.be.true;
            expect(res.json.calledWith(hotel)).to.be.true;
        });

        it('should return 404 if hotel not found', async () => {
            const findByIdStub = sinon.stub(Hotel, 'findById').resolves(null);
            const req = { params: { id: new mongoose.Types.ObjectId() } };
            const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

            await getHotelById(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ message: 'Hotel not found' })).to.be.true;
        });
    });

    describe('CreateHotel Function Test', () => {
        it('should create a new hotel', async () => {
            const hotelData = { name: 'New Hotel' };
            const createdHotel = { _id: new mongoose.Types.ObjectId(), ...hotelData };
    
            
            const saveStub = sinon.stub(Hotel.prototype, 'save').resolves(createdHotel);
    
            const req = { body: hotelData };
            const res = { 
                json: sinon.spy(), 
                status: sinon.stub().returnsThis() 
            };
    
            await createHotel(req, res);
    
           
            expect(res.status.calledWith(201)).to.equal(true);  
    
            
            expect(res.json.calledWithMatch({ name: 'New Hotel' })).to.equal(true);
        });
    });
    
    

    describe('UpdateHotel Function Test', () => {
        it('should update a hotel', async () => {
            const hotel = { _id: new mongoose.Types.ObjectId(), name: 'Old Hotel', save: sinon.stub().resolvesThis() };
            const findByIdStub = sinon.stub(Hotel, 'findById').resolves(hotel);
            const req = { params: { id: hotel._id }, body: { name: 'Updated Hotel' } };
            const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

            await updateHotel(req, res);

            expect(hotel.name).to.equal('Updated Hotel');
            expect(res.json.calledWith(hotel)).to.be.true;
        });
    });

    describe('DeleteHotel Function Test', () => {
        it('should delete a hotel', async () => {
            const hotel = { _id: new mongoose.Types.ObjectId(), remove: sinon.stub().resolves() };
            const findByIdStub = sinon.stub(Hotel, 'findById').resolves(hotel);
            const req = { params: { id: hotel._id } };
            const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

            await deleteHotel(req, res);

            expect(findByIdStub.calledOnceWith(hotel._id)).to.be.true;
            expect(hotel.remove.calledOnce).to.be.true;
            expect(res.json.calledWith({ message: 'Hotel deleted' })).to.be.true;
        });
    });
});
