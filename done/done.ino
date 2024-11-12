#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

// Thông tin WiFi
const char* ssid = "TP-Link_5182";         // Thay bằng tên WiFi của bạn
const char* password = "12223626";  // Thay bằng mật khẩu WiFi của bạn

// Thông tin MQTT
const char* mqtt_server = "192.168.0.104"; 
const char* sensor_topic = "sensor/data";   // Chủ đề gửi dữ liệu cảm biến
const char* control_topic = "led/control"; // Chủ đề điều khiển đèn
const char* mqtt_user = "tatiendat";          
const char* mqtt_password = "b21dccn219";    

WiFiClient espClient;
PubSubClient client(espClient);

// Cài đặt DHT11
#define DHTPIN D5
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// Chân kết nối cho 3 đèn LED
#define LED_FAN D0
#define LED_LED D1
#define LED_LAPTOP D2

void setup() {
  Serial.begin(115200);
  dht.begin();
  
  // Khởi tạo chân LED
  pinMode(LED_FAN, OUTPUT);
  pinMode(LED_LED, OUTPUT);
  pinMode(LED_LAPTOP, OUTPUT);
  digitalWrite(LED_FAN, LOW);
  digitalWrite(LED_LED, LOW);
  digitalWrite(LED_LAPTOP, LOW);
  
  // Kết nối WiFi
  setup_wifi();

  // Cài đặt máy khách MQTT
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Đọc dữ liệu từ cảm biến DHT11
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  // Kiểm tra lỗi đọc
  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  // Đọc dữ liệu từ cảm biến ánh sáng
  int lightValue = analogRead(A0); // Đọc giá trị từ chân A0

  // Tạo chuỗi JSON cho tất cả dữ liệu cảm biến
  String payload = String("{\"temperature\":") + t + 
                   ",\"humidity\":" + h + 
                   ",\"light\":" + lightValue + "}";

  // Gửi dữ liệu đến broker MQTT qua chủ đề sensor_topic
  client.publish(sensor_topic, payload.c_str());
  
  // Hiển thị dữ liệu trên Serial Monitor
  Serial.println(payload);

  // Đợi 5 giây trước khi gửi dữ liệu tiếp theo
  delay(5000);
}

void setup_wifi() {
  delay(10);
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println(" connected");
}

void reconnect() {
  // Loop cho đến khi kết nối lại thành công
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    
    // Thử kết nối với thông tin xác thực
    if (client.connect("ESP8266Client", mqtt_user, mqtt_password)) {
      Serial.println("connected");
      // Đăng ký lắng nghe chủ đề điều khiển đèn
      client.subscribe(control_topic);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(2000);
    }
  }
}

// Callback xử lý khi nhận tin nhắn từ broker
void callback(char* topic, byte* message, unsigned int length) {
  // Chuyển đổi thông điệp thành chuỗi
  String msg = "";
  for (int i = 0; i < length; i++) {
    msg += (char)message[i];
  }
  
  // Kiểm tra nếu tin nhắn đến từ chủ đề điều khiển
  if (String(topic) == control_topic) {
    // Kiểm tra nội dung tin nhắn và điều khiển LED
    if (msg == "fan: on") {
      digitalWrite(LED_FAN, HIGH); // Bật quạt
    } else if (msg == "fan: off") {
      digitalWrite(LED_FAN, LOW);  // Tắt quạt
    } else if (msg == "led: on") {
      digitalWrite(LED_LED, HIGH); // Bật đèn LED
    } else if (msg == "led: off") {
      digitalWrite(LED_LED, LOW);  // Tắt đèn LED
    } else if (msg == "laptop: on") {
      digitalWrite(LED_LAPTOP, HIGH); // Bật laptop
    } else if (msg == "laptop: off") {
      digitalWrite(LED_LAPTOP, LOW);  // Tắt laptop
    } else if (msg == "all: on") {
      // Bật tất cả đèn
      digitalWrite(LED_FAN, HIGH);
      digitalWrite(LED_LED, HIGH);
      digitalWrite(LED_LAPTOP, HIGH);
      Serial.println("All lights turned ON");
    } else if (msg == "all: off") {
      // Tắt tất cả đèn
      digitalWrite(LED_FAN, LOW);
      digitalWrite(LED_LED, LOW);
      digitalWrite(LED_LAPTOP, LOW);
      Serial.println("All lights turned OFF");
    }
  }
}
