const {app} = require('../../app');
const request = require('supertest')(app);

let token;

describe('files', () => {
    beforeAll(function (done) {
        request
            .post('/api/users/login')
            .send({email: 'tine@gmail.com', password: '123123'})
            .end(function (err, res) {
                token = res.body.token;
                done();
            });
    });

    it('Upload multiple files', async () => {
        const taskId = '63066ce5e8615093b774c67f';

        const {body, statusCode} = await request
            .post(`/api/tasks/${taskId}/files`)
            .set('Authorization', 'Bearer ' + token)
            .attach('files', 'C:/Users/tinec/Desktop/Faks/3.letnik/Diploma/test_files/test1.txt')
            .attach('files', 'C:/Users/tinec/Desktop/Faks/3.letnik/Diploma/test_files/test2.txt')
            .attach('files', 'C:/Users/tinec/Desktop/Faks/3.letnik/Diploma/test_files/test3.txt')
            .attach('files', 'C:/Users/tinec/Desktop/Faks/3.letnik/Diploma/test_files/test4.txt')
            .attach('files', 'C:/Users/tinec/Desktop/Faks/3.letnik/Diploma/test_files/test5.txt')
            .attach('files', 'C:/Users/tinec/Desktop/Faks/3.letnik/Diploma/test_files/test6.txt')
            .attach('files', 'C:/Users/tinec/Desktop/Faks/3.letnik/Diploma/test_files/test7.txt')
            .attach('files', 'C:/Users/tinec/Desktop/Faks/3.letnik/Diploma/test_files/test8.txt')
            .attach('files', 'C:/Users/tinec/Desktop/Faks/3.letnik/Diploma/test_files/test9.txt')
            .attach('files', 'C:/Users/tinec/Desktop/Faks/3.letnik/Diploma/test_files/test10.txt')
            .attach('files', 'C:/Users/tinec/Desktop/Faks/3.letnik/Diploma/test_files/test11.txt')
            .attach('files', 'C:/Users/tinec/Desktop/Faks/3.letnik/Diploma/test_files/test12.txt')
            .attach('files', 'C:/Users/tinec/Desktop/Faks/3.letnik/Diploma/test_files/test13.txt')
            .attach('files', 'C:/Users/tinec/Desktop/Faks/3.letnik/Diploma/test_files/test14.txt')
            .attach('files', 'C:/Users/tinec/Desktop/Faks/3.letnik/Diploma/test_files/test15.txt')
            .attach('files', 'C:/Users/tinec/Desktop/Faks/3.letnik/Diploma/test_files/test16.txt')
            .attach('files', 'C:/Users/tinec/Desktop/Faks/3.letnik/Diploma/test_files/test17.txt')
            .attach('files', 'C:/Users/tinec/Desktop/Faks/3.letnik/Diploma/test_files/test18.txt')
            .attach('files', 'C:/Users/tinec/Desktop/Faks/3.letnik/Diploma/test_files/test19.txt')

        expect(statusCode).toBe(200);
        expect(body.numberOfNewFiles).toBe(19);
    });

    it('Upload a large file', async () => {
        const taskId = '63066ce5e8615093b774c67f';
        const {body, statusCode} = await request
            .post(`/api/tasks/${taskId}/files`)
            .set('Authorization', 'Bearer ' + token)
            .attach('files', 'E:/Videos/Office/The.Office.US.SEASON.06.S06.COMPLETE.720p.BrRip.2CH.x265.HEVC-PSA/large_file.mkv')

        expect(statusCode).toBe(200);
        expect(body.numberOfNewFiles).toBe(1);
    });
});