const { initMqttClient, publishControlMessage } = require('./mqttClient');

// Khởi động client MQTT
initMqttClient();
const express = require('express');
const router = express.Router();
const {db} = require('./mysqlConnection'); // Đảm bảo bạn đã xuất db từ tệp kết nối


// API để lấy dữ liệu từ MySQL
router.get('/datasensor', (req, res) => {
    // Lấy giá trị search và status từ query string
    const search = req.query.search || ''; // Nếu không có search thì mặc định là chuỗi rỗng
    const status = req.query.status || ''; // Nếu không có status thì mặc định là chuỗi rỗng

    // Thêm wildcard (%) để tìm kiếm dựa trên một phần của giá trị
    const searchValue = `%${search}%`;

    // Xây dựng câu truy vấn SQL dựa trên status
    let query = '';
    let params = [];

    if (status === 'temperature') {
        query = 'SELECT * FROM datasensor WHERE temperature LIKE ?';
        params = [searchValue];
    } else if (status === 'humidity') {
        query = 'SELECT * FROM datasensor WHERE humidity LIKE ?';
        params = [searchValue];
    } else if (status === 'light') {
        query = 'SELECT * FROM datasensor WHERE light LIKE ?';
        params = [searchValue];
    } else {
        // Nếu không có status cụ thể, tìm kiếm trên tất cả các cột
        query = `
            SELECT * FROM datasensor
            WHERE id LIKE ?
            OR temperature LIKE ?
            OR humidity LIKE ?
            OR light LIKE ?
            OR DATE_FORMAT(time, '%Y-%m-%d %H:%i:%s') LIKE ?`;
        params = [searchValue, searchValue, searchValue, searchValue, searchValue];
    }

    // Thực thi câu truy vấn với các giá trị tìm kiếm
    db.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results); // Gửi kết quả về frontend
    });
});




// api 20 gia tri gan nhat
router.get('/datasensor/recent', (req, res) => {
    const query = 'SELECT * FROM datasensor ORDER BY time DESC LIMIT 20'; // Sắp xếp theo thời gian và lấy 20 hàng
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results); // Gửi kết quả về frontend
    });
});


router.post('/control', (req, res) => {
    const { device, status } = req.body; // Lấy dữ liệu từ request body
  
    if (!device || !status) {
      return res.status(400).json({ error: 'Device and status are required' });
    }
  
    // Gửi lệnh điều khiển qua MQTT
    publishControlMessage(device, status);
  
    // Trả phản hồi thành công về cho client
    res.status(200).json({ message: 'Command sent successfully' });
});

router.get('/history', (req, res) => {
    // Lấy giá trị search và device từ query string
    const search = req.query.search || ''; // Nếu không có search thì mặc định là chuỗi rỗng
    const device = req.query.status || ''; // Nếu không có device thì mặc định là chuỗi rỗng
    
    // Sử dụng wildcard (%) để tìm kiếm theo nhiều cột
    const searchValue = `%${search}%`;

    // Câu truy vấn SQL: tìm kiếm theo nhiều cột, bao gồm cả device
    const query = `
        SELECT * FROM history 
        WHERE (id LIKE ? 
        OR status LIKE ? 
        OR DATE_FORMAT(time, '%Y-%m-%d %H:%i:%s') LIKE ?)
        ${device ? 'AND device = ?' : ''}`; // Thêm điều kiện cho device nếu có

    // Tạo mảng chứa các giá trị để truyền vào query
    const queryValues = [searchValue, searchValue, searchValue];
    
    // Thêm device vào mảng queryValues nếu có
    if (device) {
        queryValues.push(device);
    }

    db.query(query, queryValues, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results); // Gửi kết quả về frontend
    });
});



module.exports = router;
