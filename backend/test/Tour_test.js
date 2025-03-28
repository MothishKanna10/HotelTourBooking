const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const sinon = require('sinon');
const { expect } = chai;
const Tour = require('../models/Tour');
const { getTours, getTourById, createTour, updateTour, deleteTour } = require('../controllers/TourController');

chai.use(chaiHttp);

describe('Tour Controller Tests', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('GetTours Function Test', () => {
        it('should return all tours', async () => {
            const tours = [
                { _id: new mongoose.Types.ObjectId(), title: 'Amazing Bali Trip' },
                { _id: new mongoose.Types.ObjectId(), title: 'Exciting Paris Tour' }
            ];

            const findStub = sinon.stub(Tour, 'find').resolves(tours);
            const req = {};
            const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

            await getTours(req, res);

            expect(findStub.calledOnce).to.be.true;
            expect(res.json.calledWith(tours)).to.be.true;
        });

        it('should return 500 on error', async () => {
            const findStub = sinon.stub(Tour, 'find').throws(new Error('DB Error'));
            const req = {};
            const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

            await getTours(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;
        });
    });

    describe('GetTourById Function Test', () => {
        it('should return a tour by ID', async () => {
            const tour = { _id: new mongoose.Types.ObjectId(), title: 'Amazing Bali Trip' };
            const findByIdStub = sinon.stub(Tour, 'findById').resolves(tour);
            const req = { params: { id: tour._id } };
            const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

            await getTourById(req, res);

            expect(findByIdStub.calledOnceWith(tour._id)).to.be.true;
            expect(res.json.calledWith(tour)).to.be.true;
        });

        it('should return 404 if tour not found', async () => {
            const findByIdStub = sinon.stub(Tour, 'findById').resolves(null);
            const req = { params: { id: new mongoose.Types.ObjectId() } };
            const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

            await getTourById(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ message: 'Tour not found' })).to.be.true;
        });
    });

    describe('CreateTour Function Test', () => {
        it('should create a new tour', async () => {
            const tourData = { title: 'Amazing Bali Trip', destination: 'Bali', duration: 7, price: 1500, maxPeople: 10, availableSpots: 5 };
            const createdTour = { _id: new mongoose.Types.ObjectId(), ...tourData };

            const saveStub = sinon.stub(Tour.prototype, 'save').resolves(createdTour);

            const req = { body: tourData };
            const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

            await createTour(req, res);

            expect(res.status.calledWith(201)).to.equal(true);
            expect(res.json.calledWithMatch({ title: 'Amazing Bali Trip' })).to.equal(true);
        });

        it('should return 500 on error', async () => {
            const saveStub = sinon.stub(Tour.prototype, 'save').throws(new Error('DB Error'));
            const req = { body: { title: 'Amazing Bali Trip' } };
            const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

            await createTour(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;
        });
    });

    describe('UpdateTour Function Test', () => {
        it('should update a tour', async () => {
            const tour = { _id: new mongoose.Types.ObjectId(), title: 'Old Tour', save: sinon.stub().resolvesThis() };
            const findByIdStub = sinon.stub(Tour, 'findById').resolves(tour);
            const req = { params: { id: tour._id }, body: { title: 'Updated Tour' } };
            const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

            await updateTour(req, res);

            expect(tour.title).to.equal('Updated Tour');
            expect(res.json.calledWith(tour)).to.be.true;
        });

        it('should return 404 if tour not found', async () => {
            const findByIdStub = sinon.stub(Tour, 'findById').resolves(null);
            const req = { params: { id: new mongoose.Types.ObjectId() }, body: { title: 'Updated Tour' } };
            const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

            await updateTour(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ message: 'Tour not found' })).to.be.true;
        });
    });

    describe('DeleteTour Function Test', () => {
        it('should delete a tour', async () => {
            const tour = { _id: new mongoose.Types.ObjectId(), remove: sinon.stub().resolves() };
            const findByIdStub = sinon.stub(Tour, 'findById').resolves(tour);
            const req = { params: { id: tour._id } };
            const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

            await deleteTour(req, res);

            expect(findByIdStub.calledOnceWith(tour._id)).to.be.true;
            expect(tour.remove.calledOnce).to.be.true;
            expect(res.json.calledWith({ message: 'Tour deleted' })).to.be.true;
        });

        it('should return 404 if tour not found', async () => {
            const findByIdStub = sinon.stub(Tour, 'findById').resolves(null);
            const req = { params: { id: new mongoose.Types.ObjectId() } };
            const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

            await deleteTour(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ message: 'Tour not found' })).to.be.true;
        });
    });
});
