const testCode = require('../user.service');
const {User} = require('../../model/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.JWT_SECRET;

const saltRounds =10;
jest.mock('../../model/index',()=>{
    return {
        User:{
            findByPk: jest.fn(),
            findByall: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
        }
    }
});
jest.mock('bcrypt', ()=>{
    return {
        hashSync:jest.fn(),
        compare:jest.fn(),
    }
})

jest.mock('jsonwebtoken', ()=>{
    return {
        sign:jest.fn(),
        decode:jest.fn(),
    }
})




afterEach(()=>{
    jest.clearAllMocks()
})

const defaultUserData = {
    username: "duck",
    password: "duckie123",
    email: "duckie@fishpond.com",
    name: "chicken",
}

const defaultUsernameLogin = {
    username: "duck",
    password: "duckie123",
}

const defaultEmailLogin = {
    email:"duckie@fishpond.com",
    password: "duckie123",
}

describe('User creation service test', ()=>{
    test('Test 1: Status 403 returns since username already exists', async ()=>{

        const findByPkMock = jest.spyOn(User,"findByPk").mockResolvedValue({
            username: "duck",
            hashedPassword: "1234fda34wdfasdf",
            email: "chicks@animalfarm.com",
            name: "duck",
            mongoId: 3
        })

        let results = await testCode.create(defaultUserData);

        expect(findByPkMock).toBeCalledWith("duck");
        expect(results.status).toBe(403);
    });

    test('Test 2: Status 403 return since email already exists', async ()=>{

        const findByPkMock = jest.spyOn(User,"findByPk").mockResolvedValue(null);

        const findOneMock = jest.spyOn(User, "findOne").mockResolvedValue({
            username: "chicken",
            hashedPassword: "1234fda34wdfasdf",
            email: "duckie@fishpond.com",
            name: "duck",
            mongoId: 3
        })

        let results = await testCode.create(defaultUserData);

        expect(findByPkMock).toBeCalledWith("duck");
        expect(findOneMock).toBeCalledWith({where:{email:"duckie@fishpond.com"}});
        expect(results.status).toBe(403);
    });


    test('Test 3: Status 200 returned for successful user creation', async ()=>{

        const findByPkMock = jest.spyOn(User,"findByPk").mockResolvedValue(null);

        const findOneMock = jest.spyOn(User, "findOne").mockResolvedValue(null);
        
        const bcryptHashSyncMock = jest.spyOn(bcrypt, "hashSync").mockReturnValue("123sadq2saf");
        const createMock = jest.spyOn(User,"create").mockResolvedValue({
            username: defaultUserData.username,
            email: defaultUserData.email,
            name: defaultUserData.name, 
            hashedPassword: bcryptHashSyncMock,
            mongoId: 3,
        })


        let results = await testCode.create(defaultUserData);

        expect(findByPkMock).toBeCalledWith("duck");
        expect(findOneMock).toBeCalledWith({where:{email:"duckie@fishpond.com"}});
        expect(bcryptHashSyncMock).toBeCalledWith(defaultUserData.password, saltRounds);
        expect (createMock).toBeCalledWith({
            username: defaultUserData.username,
            email: defaultUserData.email,
            name: defaultUserData.name, 
            hashedPassword: "123sadq2saf",
        })
        expect(results.status).toBe(201);
    });
});

describe('User Login service test', ()=>{
    test('test 1: returns status 201 when log in is successful based on username and password', async ()=>{
        const findByPkMock = jest.spyOn(User, "findByPk").mockResolvedValue({
            username: "duck",
            hashedPassword: "1234fda34wdfasdf",
            email: "duckie@fishpond.com",
            name: "chicken",
            mongoId: 3,
        });

        const compareMock = jest.spyOn(bcrypt, "compare").mockReturnValue(true);

        const signMock = jest.spyOn(jwt,'sign').mockReturnValue('ASEDrfhun23j4.err32rwfadsf.q3432erdsaf');

        const decodeMock = jest.spyOn(jwt, 'decode').mockReturnValue({
            username: "duck",
            mongoId: 3,
            exp: 102390
        })

        let results = await testCode.login(defaultUsernameLogin);

        expect(findByPkMock).toBeCalledWith("duck");

        expect(compareMock).toBeCalledWith("duckie123", "1234fda34wdfasdf");

        expect(signMock).toBeCalledWith({username: "duck", mongoId: 3}, jwtSecret,{expiresIn: "30 days"});
        expect(results.status).toBe(201);

    })
})
