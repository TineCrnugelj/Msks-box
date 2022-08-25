const {app} = require('../../app');
const request = require('supertest')(app);

let token;
let taskId;
let lockToken;

describe('Create task, upload files and logs', () => {
    beforeAll(function (done) {
        request
            .post('/api/users/login')
            .send({email: 'tine@gmail.com', password: '123123'})
            .end(function (err, res) {
                token = res.body.token;
                done();
            });
    });

    it('Create a task with dependencies', async () => {
        const newTask = {
            source: 'file:///home/lukacu/checkouts/gaptrack/',
            entrypoint: 'train_match',
            tag: 'match_16_large',
            arguments: [
                "backbone=resnet18",
                "stop_epochs=200",
                "lr_step=30",
                "lr_gamma=0.5",
                "embedding_loss=false",
                "batch_size=64",
                "feature_reduction=256",
                "augment_move=60",
                "delta=3",
                "batch_size=64",
                "augment_scale=0.2",
                "mismatches=0.05",
                "position_weight=30"
            ]
        }

        const {body, statusCode} = await request
            .post(`/api/tasks`)
            .set('Authorization', 'Bearer ' + token)
            .send(newTask);

        taskId = body._id;

        expect(statusCode).toBe(201);
        expect(body.dependencies).toHaveLength(0)
        expect(body.arguments).toHaveLength(14);
    });

    it('Get task by id', async () => {
        const {body, statusCode} = await request.get(`/api/tasks/${taskId}`);

        expect(statusCode).toBe(200);
    });

    it('Lock task', async () => {
        const {body, statusCode} = await request.post(`/api/tasks/${taskId}/lock`);
        lockToken = body.accessToken;
    });

    it('Upload files for the task', async () => {
        const {body, statusCode} = await request
            .post(`/api/tasks/${taskId}/files`)
            .set('Authorization', 'Bearer ' + lockToken)
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

        await request
            .post(`/api/tasks/${taskId}/files`)
            .set('Authorization', 'Bearer ' + token)
            .attach('files', 'E:/Videos/Office/The.Office.US.SEASON.06.S06.COMPLETE.720p.BrRip.2CH.x265.HEVC-PSA/large_file.mkv')

        expect(statusCode).toBe(200);
        expect(body.numberOfNewFiles).toBe(18);
    });

    it('Get files of the task', async () => {
       const {body, statusCode} = await request
           .get(`/api/tasks/${taskId}/files`)

        expect(statusCode).toBe(200);
        expect(body).toHaveLength(19);
    });

    it('Post logs for the task', async () => {
        const logData = {
            logData: ["Selected GPU is 1", "Constructing training dataset", "Load start", "load end", "Load start", "load end", "Load start", "load end", "Load start", "load end", "Load start", "1 % 3 % 5 % 6 % 8 % 10 % 11 % 13 % 15 % 16 % 18 % 20 % 21 % 23 % 25 % 26 % 28 % 30 % 31 % 33 % 35 % 36 % 38 % 40 % 41 % 43 % 45 % 46 % 48 % 50 % 51 % 53 % 55 % 56 % 58 % 60 % 61 % 63 % 65 % 66 % 68 % 70 % 71 % 73 % 75 % 76 % 78 % 80 % 81 % 83 % 85 % 86 % 88 % 90 % 91 % 93 % 95 % 96 % 98 % 100 %", "load end", "Constructing test dataset", "Loading model from c45d7625a068494e80482c5a69114c9f3f3ec79c_state.pt", "Fine-tuning state embedding", "Backbone resnet18@layer3", "Latent size 16", "Patch size 288", "Using latent size 16", "Running training", "step: 1", "train_time: 211.6482", "train_loss_seg: 0.0016", "train_loss_loc: 0.0096", "train_loss_box: 0.3269", "train_loss_emb: 0.2943", "train_loss: 0.6325", "test_loss_seg: 0.0015", "test_loss_loc: 0.0092", "test_loss_box: 0.3745", "test_loss_emb: 0.3095", "test_loss: 0.6948", "Saving currently best model", "Preview: file://epoch_001.jpg", "step: 2", "train_time: 210.1705", "train_loss_seg: 0.0015", "train_loss_loc: 0.0084", "train_loss_box: 0.3028", "train_loss_emb: 0.2673", "train_loss: 0.5801", "test_loss_seg: 0.0014", "test_loss_loc: 0.0090", "test_loss_box: 0.3927", "test_loss_emb: 0.2876", "test_loss: 0.6907", "Saving currently best model", "Preview: file://epoch_002.jpg", "step: 3", "train_time: 206.4526", "train_loss_seg: 0.0015", "train_loss_loc: 0.0081", "train_loss_box: 0.2915", "train_loss_emb: 0.2503", "train_loss: 0.5513", "test_loss_seg: 0.0014", "test_loss_loc: 0.0083", "test_loss_box: 0.3297", "test_loss_emb: 0.2713", "test_loss: 0.6106", "Saving currently best model", "Preview: file://epoch_003.jpg", "step: 4", "train_time: 211.7249", "train_loss_seg: 0.0014", "train_loss_loc: 0.0082", "train_loss_box: 0.2893", "train_loss_emb: 0.2384", "train_loss: 0.5372", "test_loss_seg: 0.0015", "test_loss_loc: 0.0089", "test_loss_box: 0.3813", "test_loss_emb: 0.3086", "test_loss: 0.7004", "Preview: file://epoch_004.jpg", "step: 5", "train_time: 208.5379", "train_loss_seg: 0.0015", "train_loss_loc: 0.0080", "train_loss_box: 0.2837", "train_loss_emb: 0.2424", "train_loss: 0.5356", "test_loss_seg: 0.0013", "test_loss_loc: 0.0080", "test_loss_box: 0.3320", "test_loss_emb: 0.2546", "test_loss: 0.5960", "Saving currently best model", "Preview: file://epoch_005.jpg", "step: 6", "train_time: 207.4955", "train_loss_seg: 0.0015", "train_loss_loc: 0.0084", "train_loss_box: 0.2797", "train_loss_emb: 0.2381", "train_loss: 0.5277", "test_loss_seg: 0.0013", "test_loss_loc: 0.0075", "test_loss_box: 0.3236", "test_loss_emb: 0.2350", "test_loss: 0.5674", "Saving currently best model", "Preview: file://epoch_006.jpg", "step: 7", "train_time: 211.2022", "train_loss_seg: 0.0014", "train_loss_loc: 0.0075", "train_loss_box: 0.2777", "train_loss_emb: 0.2308", "train_loss: 0.5175", "test_loss_seg: 0.0015", "test_loss_loc: 0.0086", "test_loss_box: 0.3315", "test_loss_emb: 0.2677", "test_loss: 0.6093", "Preview: file://epoch_007.jpg", "step: 8", "train_time: 207.1027", "train_loss_seg: 0.0013", "train_loss_loc: 0.0075", "train_loss_box: 0.2763", "train_loss_emb: 0.2225", "train_loss: 0.5076", "test_loss_seg: 0.0013", "test_loss_loc: 0.0080", "test_loss_box: 0.3180", "test_loss_emb: 0.2490", "test_loss: 0.5763", "Preview: file://epoch_008.jpg", "step: 9", "train_time: 213.5751", "train_loss_seg: 0.0013", "train_loss_loc: 0.0068", "train_loss_box: 0.2678", "train_loss_emb: 0.2187", "train_loss: 0.4947", "test_loss_seg: 0.0013", "test_loss_loc: 0.0085", "test_loss_box: 0.3220", "test_loss_emb: 0.2456", "test_loss: 0.5775", "Preview: file://epoch_009.jpg", "step: 10", "train_time: 199.9676", "train_loss_seg: 0.0013", "train_loss_loc: 0.0071", "train_loss_box: 0.2664", "train_loss_emb: 0.2169", "train_loss: 0.4917", "test_loss_seg: 0.0013", "test_loss_loc: 0.0089", "test_loss_box: 0.3166", "test_loss_emb: 0.2372", "test_loss: 0.5639", "Saving currently best model", "Preview: file://epoch_010.jpg", "step: 11", "train_time: 199.5636", "train_loss_seg: 0.0013", "train_loss_loc: 0.0072", "train_loss_box: 0.2671", "train_loss_emb: 0.2157", "train_loss: 0.4912", "test_loss_seg: 0.0013", "test_loss_loc: 0.0084", "test_loss_box: 0.3187", "test_loss_emb: 0.2326", "test_loss: 0.5609", "Saving currently best model", "Preview: file://epoch_011.jpg", "step: 12", "train_time: 200.6974", "train_loss_seg: 0.0013", "train_loss_loc: 0.0066", "train_loss_box: 0.2623", "train_loss_emb: 0.2086", "train_loss: 0.4788", "test_loss_seg: 0.0013", "test_loss_loc: 0.0079", "test_loss_box: 0.3264", "test_loss_emb: 0.2491", "test_loss: 0.5847", "Preview: file://epoch_012.jpg", "step: 13", "train_time: 200.9401", "train_loss_seg: 0.0012", "train_loss_loc: 0.0060", "train_loss_box: 0.2623", "train_loss_emb: 0.2044", "train_loss: 0.4739", "test_loss_seg: 0.0012", "test_loss_loc: 0.0077", "test_loss_box: 0.3088", "test_loss_emb: 0.2307", "test_loss: 0.5484", "Saving currently best model", "Preview: file://epoch_013.jpg", "step: 14", "train_time: 201.1437", "train_loss_seg: 0.0012", "train_loss_loc: 0.0062", "train_loss_box: 0.2643", "train_loss_emb: 0.2000", "train_loss: 0.4717", "test_loss_seg: 0.0072", "test_loss_loc: 0.0213", "test_loss_box: 0.8894", "test_loss_emb: 1.3157", "test_loss: 2.2336", "Preview: file://epoch_014.jpg", "step: 15", "train_time: 200.8331", "train_loss_seg: 0.0013", "train_loss_loc: 0.0067", "train_loss_box: 0.2596", "train_loss_emb: 0.2056", "train_loss: 0.4731", "test_loss_seg: 0.0014", "test_loss_loc: 0.0093", "test_loss_box: 0.3469", "test_loss_emb: 0.2813", "test_loss: 0.6388", "Preview: file://epoch_015.jpg", "step: 16", "train_time: 201.9938", "train_loss_seg: 0.0013", "train_loss_loc: 0.0073", "train_loss_box: 0.2594", "train_loss_emb: 0.2037", "train_loss: 0.4716", "test_loss_seg: 0.0027", "test_loss_loc: 0.0138", "test_loss_box: 0.5507", "test_loss_emb: 0.6111", "test_loss: 1.1782", "Preview: file://epoch_016.jpg", "step: 17", "train_time: 201.8563", "train_loss_seg: 0.0012", "train_loss_loc: 0.0063", "train_loss_box: 0.2615", "train_loss_emb: 0.1997", "train_loss: 0.4686", "test_loss_seg: 0.0032", "test_loss_loc: 0.0171", "test_loss_box: 0.7063", "test_loss_emb: 0.8803", "test_loss: 1.6069", "Preview: file://epoch_017.jpg", "step: 18", "train_time: 201.7351", "train_loss_seg: 0.0012", "train_loss_loc: 0.0076", "train_loss_box: 0.2581", "train_loss_emb: 0.2041", "train_loss: 0.4711", "test_loss_seg: 0.0021", "test_loss_loc: 0.0131", "test_loss_box: 0.5123", "test_loss_emb: 0.5313", "test_loss: 1.0588", "Preview: file://epoch_018.jpg", "step: 19", "train_time: 201.2023", "train_loss_seg: 0.0012", "train_loss_loc: 0.0070", "train_loss_box: 0.2597", "train_loss_emb: 0.2044", "train_loss: 0.4723", "test_loss_seg: 0.0055", "test_loss_loc: 0.0213", "test_loss_box: 0.8875", "test_loss_emb: 1.2777", "test_loss: 2.1920", "Preview: file://epoch_019.jpg", "step: 20", "train_time: 201.7619", "train_loss_seg: 0.0012", "train_loss_loc: 0.0056", "train_loss_box: 0.2490", "train_loss_emb: 0.1930", "train_loss: 0.4488", "test_loss_seg: 0.0019", "test_loss_loc: 0.0116", "test_loss_box: 0.3891", "test_loss_emb: 0.3603", "test_loss: 0.7630", "Preview: file://epoch_020.jpg", "step: 21", "train_time: 202.2578", "train_loss_seg: 0.0012", "train_loss_loc: 0.0059", "train_loss_box: 0.2455", "train_loss_emb: 0.1908", "train_loss: 0.4434", "test_loss_seg: 0.0012", "test_loss_loc: 0.0080", "test_loss_box: 0.3039", "test_loss_emb: 0.2114", "test_loss: 0.5244", "Saving currently best model", "Preview: file://epoch_021.jpg", "step: 22", "train_time: 202.1021", "train_loss_seg: 0.0012", "train_loss_loc: 0.0057", "train_loss_box: 0.2439", "train_loss_emb: 0.1881", "train_loss: 0.4388", "test_loss_seg: 0.0012", "test_loss_loc: 0.0078", "test_loss_box: 0.2989", "test_loss_emb: 0.2128", "test_loss: 0.5207", "Saving currently best model", "Preview: file://epoch_022.jpg", "step: 23", "train_time: 202.1126", "train_loss_seg: 0.0011", "train_loss_loc: 0.0058", "train_loss_box: 0.2469", "train_loss_emb: 0.1835", "train_loss: 0.4373", "test_loss_seg: 0.0011", "test_loss_loc: 0.0071", "test_loss_box: 0.2945", "test_loss_emb: 0.2088", "test_loss: 0.5114", "Saving currently best model", "Preview: file://epoch_023.jpg", "step: 24", "train_time: 202.0394", "train_loss_seg: 0.0012", "train_loss_loc: 0.0057", "train_loss_box: 0.2473", "train_loss_emb: 0.1845", "train_loss: 0.4386", "test_loss_seg: 0.0011", "test_loss_loc: 0.0074", "test_loss_box: 0.2957", "test_loss_emb: 0.2137", "test_loss: 0.5180", "Preview: file://epoch_024.jpg", "step: 25", "train_time: 202.1584", "train_loss_seg: 0.0012", "train_loss_loc: 0.0060", "train_loss_box: 0.2454", "train_loss_emb: 0.1915", "train_loss: 0.4442", "test_loss_seg: 0.0012", "test_loss_loc: 0.0071", "test_loss_box: 0.3055", "test_loss_emb: 0.2205", "test_loss: 0.5342", "Preview: file://epoch_025.jpg", "step: 26", "train_time: 202.3127", "train_loss_seg: 0.0012", "train_loss_loc: 0.0060", "train_loss_box: 0.2501", "train_loss_emb: 0.1921", "train_loss: 0.4495", "test_loss_seg: 0.0012", "test_loss_loc: 0.0087", "test_loss_box: 0.2989", "test_loss_emb: 0.2154", "test_loss: 0.5242", "Preview: file://epoch_026.jpg", "step: 27", "train_time: 201.6443", "train_loss_seg: 0.0012", "train_loss_loc: 0.0058", "train_loss_box: 0.2446", "train_loss_emb: 0.1919", "train_loss: 0.4435", "test_loss_seg: 0.0011", "test_loss_loc: 0.0075", "test_loss_box: 0.2927", "test_loss_emb: 0.2075", "test_loss: 0.5089", "Saving currently best model", "Preview: file://epoch_027.jpg", "step: 28", "train_time: 202.4910", "train_loss_seg: 0.0011", "train_loss_loc: 0.0062", "train_loss_box: 0.2443", "train_loss_emb: 0.1855", "train_loss: 0.4372", "test_loss_seg: 0.0012", "test_loss_loc: 0.0072", "test_loss_box: 0.2906", "test_loss_emb: 0.2061", "test_loss: 0.5051", "Saving currently best model", "Preview: file://epoch_028.jpg", "step: 29", "train_time: 202.2634", "train_loss_seg: 0.0012", "train_loss_loc: 0.0058", "train_loss_box: 0.2465", "train_loss_emb: 0.1875", "train_loss: 0.4410", "test_loss_seg: 0.0012", "test_loss_loc: 0.0075", "test_loss_box: 0.3048", "test_loss_emb: 0.2221", "test_loss: 0.5355", "Preview: file://epoch_029.jpg", "step: 30", "train_time: 202.9969", "train_loss_seg: 0.0011", "train_loss_loc: 0.0055", "train_loss_box: 0.2443", "train_loss_emb: 0.1855", "train_loss: 0.4365", "test_loss_seg: 0.0012", "test_loss_loc: 0.0073", "test_loss_box: 0.3031", "test_loss_emb: 0.2166", "test_loss: 0.5282", "Preview: file://epoch_030.jpg", "step: 31", "train_time: 201.0759", "train_loss_seg: 0.0012", "train_loss_loc: 0.0060", "train_loss_box: 0.2456", "train_loss_emb: 0.1903", "train_loss: 0.4432", "test_loss_seg: 0.0012", "test_loss_loc: 0.0073", "test_loss_box: 0.3000", "test_loss_emb: 0.2133", "test_loss: 0.5218", "Preview: file://epoch_031.jpg", "step: 32", "train_time: 201.8033", "train_loss_seg: 0.0012", "train_loss_loc: 0.0062", "train_loss_box: 0.2430", "train_loss_emb: 0.1847", "train_loss: 0.4350", "test_loss_seg: 0.0012", "test_loss_loc: 0.0080", "test_loss_box: 0.3239", "test_loss_emb: 0.2356", "test_loss: 0.5687", "Preview: file://epoch_032.jpg", "step: 33", "train_time: 201.7883", "train_loss_seg: 0.0011", "train_loss_loc: 0.0058", "train_loss_box: 0.2419", "train_loss_emb: 0.1819", "train_loss: 0.4307", "test_loss_seg: 0.0012", "test_loss_loc: 0.0075", "test_loss_box: 0.2949", "test_loss_emb: 0.2149", "test_loss: 0.5184", "Preview: file://epoch_033.jpg", "step: 34", "train_time: 202.1770", "train_loss_seg: 0.0012", "train_loss_loc: 0.0059", "train_loss_box: 0.2413", "train_loss_emb: 0.1884", "train_loss: 0.4367", "test_loss_seg: 0.0013", "test_loss_loc: 0.0081", "test_loss_box: 0.3178", "test_loss_emb: 0.2383", "test_loss: 0.5655", "Preview: file://epoch_034.jpg", "step: 35", "train_time: 201.6923", "train_loss_seg: 0.0011", "train_loss_loc: 0.0059", "train_loss_box: 0.2377", "train_loss_emb: 0.1842", "train_loss: 0.4290", "test_loss_seg: 0.0011", "test_loss_loc: 0.0071", "test_loss_box: 0.2946", "test_loss_emb: 0.2113", "test_loss: 0.5142", "Preview: file://epoch_035.jpg", "step: 36", "train_time: 201.7051", "train_loss_seg: 0.0012", "train_loss_loc: 0.0064", "train_loss_box: 0.2421", "train_loss_emb: 0.1893", "train_loss: 0.4389", "test_loss_seg: 0.0012", "test_loss_loc: 0.0076", "test_loss_box: 0.3057", "test_loss_emb: 0.2270", "test_loss: 0.5415", "Preview: file://epoch_036.jpg", "step: 37", "train_time: 201.4669", "train_loss_seg: 0.0012", "train_loss_loc: 0.0056", "train_loss_box: 0.2414", "train_loss_emb: 0.1869", "train_loss: 0.4351", "test_loss_seg: 0.0019", "test_loss_loc: 0.0115", "test_loss_box: 0.4382", "test_loss_emb: 0.4206", "test_loss: 0.8722", "Preview: file://epoch_037.jpg", "step: 38", "train_time: 201.6255", "train_loss_seg: 0.0011", "train_loss_loc: 0.0052", "train_loss_box: 0.2412", "train_loss_emb: 0.1815", "train_loss: 0.4290", "2021-06-14 13:22:24,859 ignite.handlers.early_stopping.EarlyStopping INFO: EarlyStopping: Stop training", "test_loss_seg: 0.0016", "test_loss_loc: 0.0094", "test_loss_box: 0.3755", "test_loss_emb: 0.3168", "test_loss: 0.7033", "Preview: file://epoch_038.jpg"]
        }

        const {body, statusCode} = await request
            .post(`/api/tasks/${taskId}/log`)
            .set('Authorization', 'Bearer ' + lockToken)
            .send(logData)

        expect(statusCode).toBe(200);
        expect(body).toHaveLength(12);
    });

    it('Reset the task', async () => {
        const {body, statusCode} = await request
            .post(`/api/tasks/${taskId}/reset`)
            .set('Authorization', 'Bearer ' + lockToken)

        expect(statusCode).toBe(200);
        expect(body.status).toBe('PENDING');
    });

    it('Get plots of the task, should be empty array', async () => {
        const {body, statusCode} = await request
            .get(`/api/tasks/${taskId}/plots`)

        expect(body).toHaveLength(0);
    });

    it('Update status of the task', async () => {
        const newStatus = {
            status: 'COMPLETE'
        }
        const {body, statusCode} = await request
            .post(`/api/tasks/${taskId}/status`)
            .set('Authorization', 'Bearer ' + lockToken)
            .send(newStatus)

        expect(body.status).toBe('COMPLETE');
        expect(statusCode).toBe(200);
    })

    it('Update status should not work without token', async () => {
        const newStatus = {
            status: 'COMPLETE'
        }
        const {body, statusCode} = await request
            .post(`/api/tasks/${taskId}/status`)
            .send(newStatus)

        expect(statusCode).toBe(401);
    })

});