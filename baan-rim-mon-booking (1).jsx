import React, { useState, useMemo } from "react";
import {
  MapPin, Star, Users, Wifi, Car, Menu, X, Calendar, Phone, Mail, User,
  LogIn, LogOut, Search, ChevronRight, ChevronLeft, Check, CheckCircle2,
  Trash2, Plus, ShieldCheck, MessageCircle, Coffee, Bath, Wind, Tv,
  UtensilsCrossed, Waves, TreePine, BedDouble, Navigation, Camera,
  ClipboardList, Settings, BarChart3, Tag, Clock, ChevronDown,
  Dumbbell, Tent, Refrigerator, ShowerHead, Fan
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const AMENITY_ICONS = {
  "Wi-Fi ฟรี": Wifi,
  "ที่จอดรถ": Car,
  "อาหารเช้า": Coffee,
  "อาหารเช้าบุฟเฟต์ฟรี": Coffee,
  "ห้องน้ำส่วนตัว": Bath,
  "แอร์": Wind,
  "พัดลม": Fan,
  "ทีวี": Tv,
  "ระเบียงวิวแม่น้ำ": Waves,
  "ระเบียงส่วนตัว": TreePine,
  "ร้านอาหารในที่พัก": UtensilsCrossed,
  "สระว่ายน้ำ": Waves,
  "ฟิตเนส": Dumbbell,
  "เครื่องทำน้ำอุ่น": ShowerHead,
  "ตู้เย็น": Refrigerator,
  "ลานกางเต็นท์": Tent,
  "บริการรับ-ส่ง": Navigation,
  "ยืมชุดมอญฟรี": Camera,
  "รปภ. 24 ชม.": ShieldCheck,
};

const INITIAL_ROOMS = [
  {
    id: "r1",
    name: "สามประสบ รีสอร์ท",
    type: "รีสอร์ทริมน้ำ",
    price: 1000,
    priceLabel: "1,000–3,000 บาท/คืน",
    capacity: 12,
    beds: "หลากหลาย ตั้งแต่ห้องพัก 2 ท่าน ถึงบ้านครอบครัวสูงสุด 12 ท่าน",
    distance: 300,
    distanceLabel: "300–770 ม.",
    rating: 4.2,
    reviewCount: 58,
    amenities: ["Wi-Fi ฟรี", "ที่จอดรถ", "สระว่ายน้ำ", "อาหารเช้าบุฟเฟต์ฟรี", "ฟิตเนส", "ระเบียงวิวแม่น้ำ", "แอร์", "ทีวี", "ตู้เย็น"],
    desc: "สามประสบ รีสอร์ท เป็นที่พักบรรยากาศริมน้ำ เหมาะสำหรับผู้ที่ต้องการพักผ่อนท่ามกลางธรรมชาติ มีสระว่ายน้ำอินฟินิตี้วิว 180 องศาและห้องอาหารริมผา ห่างจากสะพานมอญประมาณ 300–770 เมตร",
    roomTypes: [
      { name: "ห้องซูพีเรีย (Superior)", desc: "ขนาด 30 ตร.ม. พักได้ 2 ท่าน อยู่บนอาคารสามประสบวิว ใกล้สระว่ายน้ำ" },
      { name: "ห้องดีลักซ์ (Deluxe)", desc: "ขนาด 30 ตร.ม. พักได้ 2 ท่าน มีระเบียงส่วนตัวมองเห็นวิวแม่น้ำสามสาย" },
      { name: "บ้านเคบิน / คอทเทจ / วินเทจ", desc: "บ้านพักแยกหลัง ตกแต่งอบอุ่นสไตล์ต่าง ๆ เน้นความเป็นส่วนตัวและเงียบสงบ" },
      { name: "บ้านชมตะวัน", desc: "ตั้งอยู่ริมน้ำ รับแสงแรกของวัน พร้อมวิวแม่น้ำซองกาเลียชัดเจน" },
      { name: "พูลวิลล่าส่วนตัว (Premium)", desc: "ห้องพักระดับพรีเมียมพร้อมสระว่ายน้ำส่วนตัว เหมาะกับการพักผ่อนแบบเอกซ์คลูซีฟ" },
      { name: "ห้องครอบครัว (Family / Country House)", desc: "ห้องพักขนาดใหญ่ รองรับได้สูงสุด 12 คนต่อหลัง เหมาะกับกลุ่มเพื่อนหรือครอบครัวใหญ่" },
    ],
    checkin: "14:00",
    checkout: "11:30",
    rules: [
      "ห้ามประกอบอาหารในห้องพักและบริเวณรีสอร์ท (มีโทษปรับขั้นต่ำ 2,000 บาท)",
      "ห้องพักปลอดบุหรี่ 100% (ฝ่าฝืนมีโทษปรับ 2,000 บาท)",
      "ไม่อนุญาตให้นำสัตว์เลี้ยงเข้าพัก",
      "ไม่อนุญาตให้นำอาหารหรือเครื่องดื่มจากภายนอกเข้ามารับประทาน",
      "เด็กอายุ 0–2 ปีพักฟรีร่วมกับผู้ปกครอง, 3–8 ปีต้องใช้เตียงเสริม, 9 ปีขึ้นไปคิดราคาผู้ใหญ่",
    ],
    cancelPolicy: "ยกเลิกก่อนเข้าพัก 72 ชั่วโมง คืนเงินมัดจำเต็มจำนวนหักค่าดำเนินการ 5% หากน้อยกว่า 72 ชั่วโมงไม่สามารถคืนเงินมัดจำได้",
  },
  {
    id: "r2",
    name: "บ้านมอญนอนเล่น",
    type: "เกสต์เฮาส์",
    price: 590,
    priceLabel: "590–690 บาท/คืน",
    capacity: 4,
    beds: "บ้านไม้ไผ่ / ห้อง 2 เตียง / ห้องครอบครัว 3–4 ท่าน / ลานกางเต็นท์",
    distance: 100,
    distanceLabel: "100 ม.",
    rating: 4.9,
    reviewCount: 142,
    amenities: ["Wi-Fi ฟรี", "ที่จอดรถ", "แอร์", "เครื่องทำน้ำอุ่น", "ระเบียงส่วนตัว", "ลานกางเต็นท์"],
    desc: "บ้านมอญนอนเล่น เป็นที่พักที่เหมาะสำหรับผู้ที่ต้องการสัมผัสบรรยากาศและวิถีชีวิตของชุมชนชาวมอญ อยู่ใกล้สะพานมอญเพียงประมาณ 100 เมตร เดินทางไปยังสะพานและสถานที่สำคัญได้อย่างสะดวก",
    roomTypes: [
      { name: "บ้านไม้ไผ่ / บ้านพักธรรมชาติ", desc: "บ้านพักเรือนไม้ไผ่ ตกแต่งเรียบง่าย ใกล้ชิดธรรมชาติ บรรยากาศเงียบสงบ" },
      { name: "ห้องขนาด 2 เตียง (โซนบ้านขาว)", desc: "ห้องเปิดใหม่ มีเครื่องปรับอากาศและเครื่องทำน้ำอุ่น เตียงนอน 2 เตียง" },
      { name: "ห้องครอบครัว / กลุ่มเพื่อน", desc: "รองรับผู้เข้าพักได้ 3–4 ท่าน พร้อมแอร์และน้ำอุ่น" },
      { name: "ลานกางเต็นท์ริมน้ำ", desc: "สำหรับผู้ที่ต้องการนำเต็นท์มาเอง สัมผัสบรรยากาศริมน้ำอย่างใกล้ชิด" },
    ],
    checkin: "14:00",
    checkout: "12:00",
    rules: [
      "งดใช้เสียงดังหลัง 22:00 น.",
      "ปิดไฟส่วนกลางบางส่วนตั้งแต่ 22:30 น.",
      "ห้ามสูบบุหรี่ในห้องพักและห้องน้ำ",
      "ไม่อนุญาตให้นำสัตว์เลี้ยงเข้าพักทุกกรณี",
      "ไม่อนุญาตเครื่องใช้ไฟฟ้ากำลังวัตต์สูง เช่น กาต้มน้ำ หม้อหุงข้าว กระทะไฟฟ้า",
      "ห้ามก่อกองไฟ ใช้เตาถ่านหรือเตาแก๊สกระป๋องได้ / ผู้ใช้ลานกางเต็นท์ต้องเก็บขยะเองก่อนออกจากพื้นที่",
    ],
    cancelPolicy: "ยกเลิกฟรีก่อนเข้าพัก 1 วัน",
  },
  {
    id: "r3",
    name: "เบอมิซอินน์ รีสอร์ท",
    type: "ห้องมาตรฐาน",
    price: 400,
    priceLabel: "400 บาท/คืน",
    capacity: 4,
    beds: "ห้องพัดลม/แอร์ 2 ท่าน หรือบังกะโลครอบครัว 4 ท่าน",
    distance: 200,
    distanceLabel: "200 ม.",
    rating: 3.3,
    reviewCount: 27,
    amenities: ["Wi-Fi ฟรี", "แอร์", "พัดลม", "เครื่องทำน้ำอุ่น", "ทีวี", "ตู้เย็น", "อาหารเช้า"],
    desc: "เบอมิซอินน์ รีสอร์ท เป็นที่พักสำหรับผู้ที่ต้องการพักผ่อนในบรรยากาศธรรมชาติของสังขละบุรี ตั้งอยู่ไม่ไกลจากสะพานมอญ ราคาประหยัด เหมาะสำหรับนักเดินทางที่เน้นความคุ้มค่า",
    roomTypes: [
      { name: "ซูพีเรีย วิวสะพานมอญ", desc: "ห้องพักทำเลดี มองเห็นวิวสะพานมอญได้ชัดเจนจากตัวห้อง" },
      { name: "ห้องแอร์มาตรฐาน", desc: "ในอาคารใหม่ริมแม่น้ำ มีระเบียงหันออกสู่แม่น้ำ เลือกเตียงคู่หรือเตียงแยกได้" },
      { name: "บังกะโลแอร์ห้องแฝด", desc: "หนึ่งหลังมีสองห้องติดกัน ตั้งอยู่ริมน้ำ มีความเป็นส่วนตัว" },
      { name: "บังกะโลแอร์หลังเดี่ยว", desc: "บ้านพักแยกเป็นหลังเดี่ยว ความเป็นส่วนตัวสูงสุด ใกล้ชิดธรรมชาติ" },
      { name: "ห้องพัดลมเรือนแถว", desc: "ห้องพักราคาประหยัด บรรยากาศเรียบง่าย เหมาะกับงบจำกัด" },
      { name: "บังกะโลแอร์ครอบครัว", desc: "รองรับ 4 ท่าน เตียงใหญ่ 2 เตียง พร้อมระเบียงวิวแม่น้ำและธรรมชาติ" },
    ],
    checkin: "14:00",
    checkout: "12:00",
    rules: [
      "ไม่อนุญาตให้นำสัตว์เลี้ยงเข้าพัก",
      "งดสูบบุหรี่ในห้องพัก",
      "งดส่งเสียงดังยามวิกาลรบกวนผู้เข้าพักท่านอื่น",
      "ห้องพักมาตรฐานกำหนดสำหรับ 2 ท่านต่อห้อง เพิ่มเตียงเสริมมีค่าใช้จ่ายเพิ่มเติม",
      "ไม่อนุญาตให้ประกอบอาหารหนักหรือปิ้งย่างในห้องพักและระเบียง",
    ],
    cancelPolicy: "ยกเลิกฟรีก่อนเข้าพัก 1 วัน",
  },
  {
    id: "r4",
    name: "วังกะ รีสอร์ท",
    type: "รีสอร์ท",
    price: 861,
    priceLabel: "861 บาท/คืน",
    capacity: 4,
    beds: "Standard Twin / Standard Double / Deluxe Family / Premium",
    distance: 500,
    distanceLabel: "500–800 ม.",
    rating: 4.4,
    reviewCount: 76,
    amenities: ["Wi-Fi ฟรี", "ที่จอดรถ", "อาหารเช้าบุฟเฟต์ฟรี", "แอร์", "ทีวี", "ตู้เย็น", "เครื่องทำน้ำอุ่น", "ระเบียงส่วนตัว", "รปภ. 24 ชม.", "ยืมชุดมอญฟรี"],
    desc: "วังกะ รีสอร์ท เป็นที่พักสไตล์ร่วมสมัย ผสมผสานความเรียบง่าย ตั้งอยู่ริมถนนสายหลักในอำเภอสังขละบุรี เดินทางไปสะพานมอญและโซนวัฒนธรรมมอญได้ง่าย บรรยากาศร่มรื่นท่ามกลางขุนเขา",
    roomTypes: [
      { name: "Standard Single Bed (Twin)", desc: "ขนาด 24 ตร.ม. เตียงเดี่ยว 2 เตียงแยกจากกัน เหมาะสำหรับเพื่อน" },
      { name: "Standard Double Bed", desc: "ขนาด 24 ตร.ม. เตียงใหญ่ 1 เตียง เหมาะสำหรับคู่รัก" },
      { name: "Deluxe Family", desc: "ห้องพักขนาดใหญ่ เหมาะสำหรับครอบครัวหรือกลุ่มเพื่อน" },
      { name: "Premium Room (โซน D)", desc: "อาคารใหม่สไตล์โมเดิร์น หน้าต่างบานใหญ่ บางห้องมีอ่างอาบน้ำวิวธรรมชาติ" },
    ],
    checkin: "14:00",
    checkout: "12:00",
    rules: [
      "ไม่อนุญาตให้นำสัตว์เลี้ยงทุกชนิดเข้าพัก",
      "ห้ามสูบบุหรี่ภายในห้องพัก",
      "ไม่มีข้อจำกัดด้านอายุผู้เข้าพัก",
      "จำนวนผู้เข้าพักเป็นไปตามเงื่อนไขของแต่ละประเภทห้อง หากเกินอาจมีค่าบริการเพิ่มเติม",
    ],
    cancelPolicy: "เงื่อนไขการยกเลิกและคืนเงินขึ้นอยู่กับประเภทห้องพักและช่องทางการจอง กรุณาตรวจสอบกับรีสอร์ทก่อนยืนยัน",
  },
  {
    id: "r5",
    name: "มาชิลล์ รีสอร์ท",
    type: "รีสอร์ท",
    price: 583,
    priceLabel: "583–700 บาท/คืน",
    capacity: 2,
    beds: "ห้องเตียงเดี่ยวคิงไซส์ หรือห้องเตียงคู่แยก",
    distance: 500,
    distanceLabel: "500 ม.",
    rating: 4.0,
    reviewCount: 63,
    amenities: ["Wi-Fi ฟรี", "ที่จอดรถ", "แอร์", "ทีวี", "ตู้เย็น", "เครื่องทำน้ำอุ่น", "ระเบียงส่วนตัว", "บริการรับ-ส่ง", "ยืมชุดมอญฟรี"],
    desc: "มาชิลล์ รีสอร์ท เหมาะสำหรับนักท่องเที่ยวที่ต้องการที่พักไม่ไกลจากสะพานมอญและแหล่งท่องเที่ยวในชุมชน บริเวณโดยรอบเหมาะสำหรับการพักผ่อนและเดินทางไปยังตลาดกลางคืนได้สะดวก",
    roomTypes: [
      { name: "ห้องเตียงเดี่ยว", desc: "ห้องพักสำหรับ 2 ท่าน พร้อมเตียงคิงไซส์ขนาด 6 ฟุต เหมาะสำหรับคู่รัก" },
      { name: "ห้องเตียงคู่", desc: "ห้องพักสำหรับ 2 ท่าน พร้อมเตียงแยก เหมาะสำหรับเพื่อนหรือผู้ที่ต้องการเตียงส่วนตัว" },
    ],
    checkin: "14:00",
    checkout: "11:00",
    rules: [
      "เช็กอินได้ตั้งแต่ 14:00–19:00 น. เช็กเอาต์ก่อน 11:00 น.",
      "ต้องแจ้งเวลาที่คาดว่าจะเดินทางมาถึงล่วงหน้า",
      "เด็กอายุต่ำกว่า 11 ปีพักร่วมผู้ปกครองได้ฟรี, 11 ปีขึ้นไปคิดราคาผู้ใหญ่",
      "ไม่อนุญาตให้จัดปาร์ตี้หรือสังสรรค์เสียงดัง",
      "รองรับสัตว์เลี้ยงประเภทสุนัขหรือแมว น้ำหนักไม่เกิน 10 กิโลกรัม",
    ],
    cancelPolicy: "ราคาและเงื่อนไขอาจแตกต่างกันตามฤดูกาล กรุณาตรวจสอบกับรีสอร์ทก่อนจอง",
  },
  {
    id: "r6",
    name: "สังขละวิลเลจ รีสอร์ท",
    type: "เรือนครอบครัว",
    price: 950,
    priceLabel: "950–1,150 บาท/คืน",
    capacity: 4,
    beds: "ห้อง 2 ท่านหลากสไตล์ หรือบังกะโลครอบครัว 4 ท่าน",
    distance: 400,
    distanceLabel: "400 ม.",
    rating: 4.4,
    reviewCount: 51,
    amenities: ["Wi-Fi ฟรี", "แอร์", "พัดลม", "ทีวี", "ตู้เย็น", "เครื่องทำน้ำอุ่น", "อาหารเช้า"],
    desc: "สังขละวิลเลจ รีสอร์ท เหมาะสำหรับกลุ่มเดินทางหรือครอบครัวใหญ่ ห่างจากสะพานมอญเพียง 400 เมตร มีห้องพักหลายสไตล์ตั้งแต่ห้องวิวสะพานไปจนถึงบังกะโลครอบครัว",
    roomTypes: [
      { name: "ซูพีเรีย วิวสะพานมอญ", desc: "มองเห็นวิวสะพานมอญได้ชัดเจนจากตัวห้อง" },
      { name: "ห้องแอร์มาตรฐาน", desc: "ริมแม่น้ำ มีระเบียง เลือกเตียงคู่หรือเตียงแยกได้" },
      { name: "บังกะโลแอร์ห้องแฝด / หลังเดี่ยว", desc: "ริมน้ำ มีความเป็นส่วนตัว เหมาะกับกลุ่มเพื่อน" },
      { name: "บังกะโลแอร์ครอบครัว", desc: "รองรับ 4 ท่าน เตียงใหญ่ 2 เตียง พร้อมระเบียงวิวแม่น้ำ" },
    ],
    checkin: "14:00",
    checkout: "12:00",
    rules: [
      "ไม่อนุญาตให้นำสัตว์เลี้ยงเข้าพัก",
      "งดสูบบุหรี่ในห้องพัก",
      "งดส่งเสียงดังยามวิกาล",
      "ห้องมาตรฐานกำหนดสำหรับ 2 ท่านต่อห้อง เพิ่มเตียงเสริมมีค่าใช้จ่ายเพิ่มเติม",
    ],
    cancelPolicy: "ยกเลิกฟรีก่อนเข้าพัก 3 วัน หลังจากนั้นหักค่ามัดจำ 50%",
  },
];

const ATTRACTIONS = [
  { name: "สะพานมอญ (สะพานอุตตมานุสรณ์)", distance: "0 ม.", desc: "สะพานไม้ข้ามแม่น้ำซองกาเลียที่ยาวที่สุดในประเทศไทย จุดชมพระอาทิตย์ขึ้นที่ดีที่สุดในหมู่บ้าน" },
  { name: "วัดวังก์วิเวการาม", distance: "800 ม.", desc: "วัดเก่าแก่ริมแม่น้ำ ประดิษฐานพระพุทธรูปหลวงพ่ออุตตมะ ศูนย์รวมจิตใจของชาวมอญ" },
  { name: "เจดีย์พุทธคยาจำลอง", distance: "1.2 กม.", desc: "เจดีย์สีทองริมอ่างเก็บน้ำ มองเห็นเมืองบาดาลได้ในฤดูแล้ง" },
  { name: "ตลาดมอญเช้า", distance: "150 ม.", desc: "ตลาดเช้าท้องถิ่น ขายอาหารมอญและของพื้นเมือง เปิดตั้งแต่ตี 5" },
  { name: "จุดชมวิวเมืองบาดาล", distance: "2 กม.", desc: "ซากวัดเก่าที่จมอยู่ใต้น้ำ โผล่พ้นผิวน้ำให้เห็นในช่วงหน้าแล้ง" },
  { name: "น้ำตกเกริงกระเวีย", distance: "18 กม.", desc: "น้ำตกในป่าเขียวขจี เหมาะสำหรับทริปครึ่งวัน" },
];

const INITIAL_REVIEWS = [
  { id: "v1", name: "พิมพ์ชนก ส.", room: "เรือนไม้ริมน้ำ", clean: 5, service: 5, location: 5, value: 4, comment: "ตื่นมาเห็นสะพานมีหมอกลอยผ่าน สวยมากจนลืมเช็คมือถือไปพักหนึ่งเลยค่ะ พนักงานดูแลดีตลอดการเข้าพัก", date: "ส.ค. 2569" },
  { id: "v2", name: "ธนกร ว.", room: "ห้องวิวสะพานมอญ", clean: 5, service: 4, location: 5, value: 5, comment: "เดินไปสะพานได้เลยไม่ต้องขับรถ ห้องสะอาด เจ้าของที่พักแนะนำร้านอาหารอร่อยให้หลายที่", date: "ก.ค. 2569" },
  { id: "v3", name: "อารีย์ จ.", room: "เรือนไทยมอญดั้งเดิม", clean: 5, service: 5, location: 4, value: 5, comment: "พาครอบครัวมาพัก เด็ก ๆ ชอบเรือนไม้มาก บรรยากาศเหมือนย้อนเวลากลับไปหมู่บ้านมอญเก่า", date: "มิ.ย. 2569" },
  { id: "v4", name: "กิตติ น.", room: "บ้านต้นไม้ริมเขา", clean: 4, service: 5, location: 5, value: 4, comment: "ไปฉลองครบรอบแต่งงานกัน วิวจากบ้านต้นไม้สวยมาก เงียบสงบ เหมาะกับคู่รักจริง ๆ", date: "พ.ค. 2569" },
];

const INITIAL_PROMOS = [
  { id: "p1", title: "จองล่วงหน้า 30 วัน ลด 15%", desc: "สำหรับการจองก่อนวันเข้าพักอย่างน้อย 30 วัน" },
  { id: "p2", title: "พักครบ 3 คืน ฟรี 1 คืน", desc: "เฉพาะเรือนครอบครัวและเรือนไทยมอญดั้งเดิม" },
];

const FAQS = [
  { q: "ที่พักอยู่ห่างจากสะพานมอญเท่าไหร่", a: "ที่พักของเราตั้งอยู่ริมสะพานมอญ ห้องที่ใกล้ที่สุดเดินถึงสะพานได้ภายใน 1-2 นาที" },
  { q: "มีรถรับส่งจากตัวเมืองสังขละบุรีไหม", a: "มีบริการรับส่งจากสถานีขนส่งสังขละบุรีและตลาดสังขละ กรุณาแจ้งเวลาล่วงหน้าทางไลน์" },
  { q: "เช็กอิน เช็กเอาต์เวลาไหน", a: "เช็กอินตั้งแต่ 14:00 น. เช็กเอาต์ก่อน 12:00 น. หากต้องการเช็กอินเร็วหรือเช็กเอาต์ช้า แจ้งล่วงหน้าได้" },
  { q: "ยกเลิกการจองได้ไหม", a: "ยกเลิกได้ตามนโยบายของแต่ละห้องพัก ดูรายละเอียดได้ในหน้ารายละเอียดที่พักก่อนจอง" },
];

const money = (n) => n.toLocaleString("th-TH");

function nightsBetween(inD, outD) {
  if (!inD || !outD) return 0;
  const a = new Date(inD), b = new Date(outD);
  const diff = Math.round((b - a) / 86400000);
  return diff > 0 ? diff : 0;
}

function genCode() {
  return "RM" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

/* ------------------------------------------------------------------ */
/*  DECORATIVE PIECES                                                  */
/* ------------------------------------------------------------------ */

function PlankDivider() {
  return <div className="plank-divider" aria-hidden="true" />;
}

function BridgeIllustration({ compact }) {
  return (
    <svg viewBox="0 0 900 380" className={`bridge-illust ${compact ? "compact" : ""}`} preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F3D9A8" />
          <stop offset="55%" stopColor="#F0EAD6" />
          <stop offset="100%" stopColor="#F6F1E4" />
        </linearGradient>
        <linearGradient id="river" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3E6E68" />
          <stop offset="100%" stopColor="#2E5F58" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="900" height="380" fill="url(#sky)" />
      <circle cx="700" cy="90" r="46" fill="#E8A445" opacity="0.85" />
      <path d="M0 150 L120 90 L220 140 L340 70 L470 130 L600 60 L720 120 L900 80 L900 200 L0 200 Z" fill="#DCD3B6" opacity="0.6" />
      <path d="M0 190 L150 130 L300 175 L480 115 L650 170 L900 120 L900 230 L0 230 Z" fill="#C9BE9C" opacity="0.7" />
      <rect x="0" y="240" width="900" height="140" fill="url(#river)" />
      <g opacity="0.18">
        <path d="M0 260 Q 100 250 200 262 T 400 258 T 600 264 T 900 258" stroke="#F6F1E4" strokeWidth="3" fill="none" />
        <path d="M0 300 Q 100 292 200 302 T 400 298 T 600 304 T 900 298" stroke="#F6F1E4" strokeWidth="3" fill="none" />
      </g>
      <g stroke="#5C4327" strokeWidth="7" strokeLinecap="round">
        <path d="M60 380 L60 190 Q 450 100 840 190 L840 380" fill="none" stroke="#7A5A3A" strokeWidth="10" />
        <line x1="60" y1="190" x2="840" y2="190" stroke="#6B4226" strokeWidth="14" />
      </g>
      {Array.from({ length: 27 }).map((_, i) => {
        const x = 66 + i * 29;
        const t = i / 26;
        const y = 190 - Math.sin(t * Math.PI) * 78;
        return <rect key={i} x={x - 3} y={y - 20} width="6" height="26" rx="1" fill="#8A6540" />;
      })}
      <path d="M60 190 Q 450 100 840 190" fill="none" stroke="#4A3527" strokeWidth="6" />
    </svg>
  );
}

function StarRating({ value, size = 14 }) {
  return (
    <span className="star-rating">
      <Star size={size} strokeWidth={0} fill="#C98A3B" />
      <span>{value.toFixed(1)}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  NAV                                                                */
/* ------------------------------------------------------------------ */

function NavBar({ page, go, user, onLogout }) {
  const [open, setOpen] = useState(false);
  const links = [
    { id: "home", label: "หน้าแรก" },
    { id: "search", label: "ค้นหาห้องพัก" },
    { id: "map", label: "แผนที่ & เที่ยวรอบสะพาน" },
    { id: "reviews", label: "รีวิว" },
    { id: "about", label: "เกี่ยวกับเรา" },
  ];
  return (
    <header className="nav">
      <div className="nav-inner">
        <button className="brand" onClick={() => go("home")}>
          <span className="brand-mark">มอญ</span>
          <span className="brand-name">บ้านริมมอญ</span>
        </button>
        <nav className="nav-links desktop-only">
          {links.map((l) => (
            <button key={l.id} className={`nav-link ${page === l.id ? "active" : ""}`} onClick={() => go(l.id)}>
              {l.label}
            </button>
          ))}
        </nav>
        <div className="nav-actions desktop-only">
          {user.loggedIn ? (
            <>
              <button className="nav-link" onClick={() => go("mybookings")}>การจองของฉัน</button>
              <button className="btn btn-ghost small" onClick={onLogout}><LogOut size={15} /> ออกจากระบบ</button>
            </>
          ) : (
            <button className="btn btn-outline small" onClick={() => go("login")}><LogIn size={15} /> เข้าสู่ระบบ</button>
          )}
          <button className="btn btn-primary small" onClick={() => go("search")}>จองห้องพัก</button>
        </div>
        <button className="icon-btn mobile-only" onClick={() => setOpen((o) => !o)} aria-label="เมนู">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="nav-mobile mobile-only">
          {links.map((l) => (
            <button key={l.id} className="nav-mobile-link" onClick={() => { go(l.id); setOpen(false); }}>{l.label}</button>
          ))}
          {user.loggedIn ? (
            <>
              <button className="nav-mobile-link" onClick={() => { go("mybookings"); setOpen(false); }}>การจองของฉัน</button>
              <button className="nav-mobile-link" onClick={() => { onLogout(); setOpen(false); }}>ออกจากระบบ</button>
            </>
          ) : (
            <button className="nav-mobile-link" onClick={() => { go("login"); setOpen(false); }}>เข้าสู่ระบบ / สมัครสมาชิก</button>
          )}
          <button className="btn btn-primary" style={{ margin: "8px 18px" }} onClick={() => { go("search"); setOpen(false); }}>จองห้องพัก</button>
        </div>
      )}
    </header>
  );
}

function Footer({ go }) {
  return (
    <footer className="footer">
      <PlankDivider />
      <div className="footer-inner">
        <div>
          <div className="brand-name" style={{ color: "#F6F1E4" }}>บ้านริมมอญ</div>
          <p className="footer-text">ที่พักริมสะพานมอญ อำเภอสังขละบุรี จังหวัดกาญจนบุรี</p>
        </div>
        <div className="footer-col">
          <span className="footer-head">ลิงก์ด่วน</span>
          <button onClick={() => go("search")}>ค้นหาห้องพัก</button>
          <button onClick={() => go("map")}>แผนที่ & สถานที่ท่องเที่ยว</button>
          <button onClick={() => go("reviews")}>รีวิวจากผู้เข้าพัก</button>
          <button onClick={() => go("about")}>ติดต่อเรา</button>
        </div>
        <div className="footer-col">
          <span className="footer-head">ติดต่อ</span>
          <span>โทร 08x-xxx-xxxx</span>
          <span>LINE: @baanrimmon</span>
          <span>อีเมล hello@baanrimmon.com</span>
        </div>
      </div>
      <div className="footer-bottom">© 2569 บ้านริมมอญ · เว็บไซต์นี้เป็นตัวอย่างสาธิตระบบจองห้องพัก</div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE: HOME                                                         */
/* ------------------------------------------------------------------ */

function HomePage({ go, searchForm, setSearchForm, doSearch }) {
  const featured = INITIAL_ROOMS.slice(0, 3);
  return (
    <div>
      <section className="hero">
        <BridgeIllustration />
        <div className="hero-content container">
          <p className="eyebrow-plain">สังขละบุรี · กาญจนบุรี</p>
          <h1 className="hero-title">ตื่นมาให้สะพานมอญ<br />เป็นวิวแรกของวัน</h1>
          <p className="hero-sub">เรือนไม้ริมแม่น้ำซองกาเลีย เดินถึงสะพานไม้ที่ยาวที่สุดในประเทศไทยได้ในไม่กี่นาที</p>
        </div>
      </section>

      <section className="container search-box-wrap">
        <div className="search-box">
          <div className="field">
            <label>เช็กอิน</label>
            <input type="date" value={searchForm.checkin} onChange={(e) => setSearchForm({ ...searchForm, checkin: e.target.value })} />
          </div>
          <div className="field">
            <label>เช็กเอาต์</label>
            <input type="date" value={searchForm.checkout} onChange={(e) => setSearchForm({ ...searchForm, checkout: e.target.value })} />
          </div>
          <div className="field">
            <label>ผู้เข้าพัก</label>
            <select value={searchForm.guests} onChange={(e) => setSearchForm({ ...searchForm, guests: Number(e.target.value) })}>
              {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} คน</option>)}
            </select>
          </div>
          <button className="btn btn-primary search-btn" onClick={doSearch}><Search size={17} /> ค้นหาห้องพัก</button>
        </div>
      </section>

      <section className="container perks">
        <div className="perk"><MapPin size={20} /> ใกล้สะพานมอญที่สุดในหมู่บ้าน</div>
        <div className="perk"><Car size={20} /> ที่จอดรถส่วนตัวฟรี</div>
        <div className="perk"><Wifi size={20} /> Wi-Fi ฟรีทุกห้อง</div>
      </section>

      <PlankDivider />

      <section className="container section-pad">
        <div className="section-head">
          <h2>ที่พักแนะนำ</h2>
          <button className="link-more" onClick={() => go("search")}>ดูทั้งหมด <ChevronRight size={16} /></button>
        </div>
        <div className="room-grid">
          {featured.map((r) => <RoomCard key={r.id} room={r} onView={() => go("detail", r.id)} />)}
        </div>
      </section>

      <PlankDivider />

      <section className="container section-pad">
        <div className="section-head"><h2>โปรโมชั่น</h2></div>
        <div className="promo-grid">
          {INITIAL_PROMOS.map((p) => (
            <div key={p.id} className="promo-card">
              <Tag size={18} />
              <div>
                <div className="promo-title">{p.title}</div>
                <div className="promo-desc">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ROOM CARD                                                          */
/* ------------------------------------------------------------------ */

function RoomThumb({ seed }) {
  // deterministic soft gradient thumbnail per room, keeps a consistent illustrated look
  const hues = [
    ["#2E5F58", "#7C8B5B"],
    ["#6B4226", "#C98A3B"],
    ["#4A3527", "#2E5F58"],
    ["#7C8B5B", "#F0EAD6"],
    ["#C98A3B", "#4A3527"],
    ["#2E5F58", "#C98A3B"],
  ];
  const [c1, c2] = hues[seed % hues.length];
  return (
    <div className="room-thumb" style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}>
      <svg viewBox="0 0 100 60" className="room-thumb-svg">
        <path d="M0 40 Q 50 22 100 40 L100 60 L0 60 Z" fill="rgba(246,241,228,0.18)" />
        <line x1="8" y1="40" x2="92" y2="40" stroke="rgba(246,241,228,0.5)" strokeWidth="2" />
      </svg>
    </div>
  );
}

function RoomCard({ room, onView }) {
  const idx = INITIAL_ROOMS.findIndex((r) => r.id === room.id);
  return (
    <div className="room-card">
      <RoomThumb seed={idx} />
      <div className="room-card-body">
        <div className="room-card-top">
          <h3>{room.name}</h3>
          <StarRating value={room.rating} />
        </div>
        <div className="room-meta">
          <span><Users size={14} /> {room.capacity} คน</span>
          <span><MapPin size={14} /> ห่างสะพาน {room.distanceLabel || `${room.distance} ม.`}</span>
        </div>
        <div className="room-amenities">
          {room.amenities.slice(0, 3).map((a) => {
            const Icon = AMENITY_ICONS[a] || Check;
            return <span key={a} className="amenity-chip"><Icon size={13} /> {a}</span>;
          })}
        </div>
        <div className="room-card-bottom">
          <div className="price"><strong>฿{money(room.price)}</strong> {room.priceLabel && room.priceLabel.includes("–") ? "เริ่มต้น" : "/ คืน"}</div>
          <button className="btn btn-outline small" onClick={onView}>ดูรายละเอียด</button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE: SEARCH RESULTS                                               */
/* ------------------------------------------------------------------ */

function SearchPage({ go, searchForm, setSearchForm }) {
  const [priceMax, setPriceMax] = useState(3000);
  const [guestsFilter, setGuestsFilter] = useState(searchForm.guests || 1);
  const [type, setType] = useState("ทั้งหมด");

  const types = ["ทั้งหมด", ...Array.from(new Set(INITIAL_ROOMS.map((r) => r.type)))];

  const results = useMemo(() => {
    return INITIAL_ROOMS.filter((r) =>
      r.price <= priceMax &&
      r.capacity >= guestsFilter &&
      (type === "ทั้งหมด" || r.type === type)
    );
  }, [priceMax, guestsFilter, type]);

  const nights = nightsBetween(searchForm.checkin, searchForm.checkout);

  return (
    <div className="container section-pad">
      <div className="section-head">
        <h2>ห้องพักที่ว่าง</h2>
        <p className="muted">
          {searchForm.checkin && searchForm.checkout
            ? `${searchForm.checkin} — ${searchForm.checkout}${nights ? ` (${nights} คืน)` : ""} · ${searchForm.guests} คน`
            : "เลือกวันที่เพื่อดูห้องว่าง"}
        </p>
      </div>

      <div className="search-layout">
        <aside className="filters">
          <div className="filter-block">
            <label>เช็กอิน</label>
            <input type="date" value={searchForm.checkin} onChange={(e) => setSearchForm({ ...searchForm, checkin: e.target.value })} />
          </div>
          <div className="filter-block">
            <label>เช็กเอาต์</label>
            <input type="date" value={searchForm.checkout} onChange={(e) => setSearchForm({ ...searchForm, checkout: e.target.value })} />
          </div>
          <div className="filter-block">
            <label>ราคาสูงสุดต่อคืน: ฿{money(priceMax)}</label>
            <input type="range" min="300" max="3000" step="50" value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))} />
          </div>
          <div className="filter-block">
            <label>จำนวนผู้เข้าพักอย่างน้อย</label>
            <select value={guestsFilter} onChange={(e) => setGuestsFilter(Number(e.target.value))}>
              {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} คน</option>)}
            </select>
          </div>
          <div className="filter-block">
            <label>ประเภทห้อง</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              {types.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </aside>

        <div className="results">
          {results.length === 0 && <p className="muted">ไม่พบห้องพักที่ตรงกับเงื่อนไข ลองปรับตัวกรองใหม่</p>}
          <div className="room-grid">
            {results.map((r) => <RoomCard key={r.id} room={r} onView={() => go("detail", r.id)} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE: ROOM DETAIL                                                  */
/* ------------------------------------------------------------------ */

function DetailPage({ roomId, go }) {
  const room = INITIAL_ROOMS.find((r) => r.id === roomId) || INITIAL_ROOMS[0];
  const idx = INITIAL_ROOMS.findIndex((r) => r.id === room.id);
  return (
    <div className="container section-pad">
      <button className="back-link" onClick={() => go("search")}><ChevronLeft size={16} /> กลับไปหน้าค้นหา</button>

      <div className="detail-gallery">
        <RoomThumb seed={idx} />
        <div className="detail-gallery-side">
          <RoomThumb seed={idx + 1} />
          <RoomThumb seed={idx + 2} />
        </div>
      </div>

      <div className="detail-layout">
        <div className="detail-main">
          <h1>{room.name}</h1>
          <div className="room-meta" style={{ marginBottom: 6 }}>
            <StarRating value={room.rating} size={16} />
            <span>({room.reviewCount} รีวิว)</span>
            <span><MapPin size={14} /> ห่างจากสะพานมอญ {room.distance} ม.</span>
          </div>
          <p className="body-text">{room.desc}</p>

          <PlankDivider />

          <h3>รายละเอียดห้องพัก</h3>
          <ul className="spec-list">
            <li><span>ประเภทที่พัก</span><span>{room.type}</span></li>
            <li><span>จำนวนผู้เข้าพักสูงสุด</span><span>{room.capacity} คน</span></li>
            <li><span>รูปแบบเตียง</span><span>{room.beds}</span></li>
            <li><span>เวลาเช็กอิน</span><span>{room.checkin} น.</span></li>
            <li><span>เวลาเช็กเอาต์</span><span>{room.checkout} น.</span></li>
          </ul>

          {room.roomTypes && room.roomTypes.length > 0 && (
            <>
              <h3>ประเภทห้องพักภายในที่พัก</h3>
              <div className="room-type-list">
                {room.roomTypes.map((rt) => (
                  <div key={rt.name} className="room-type-item">
                    <BedDouble size={16} />
                    <div>
                      <div className="room-type-name">{rt.name}</div>
                      <div className="muted small-note">{rt.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <h3>สิ่งอำนวยความสะดวก</h3>
          <div className="room-amenities" style={{ marginBottom: 20 }}>
            {room.amenities.map((a) => {
              const Icon = AMENITY_ICONS[a] || Check;
              return <span key={a} className="amenity-chip"><Icon size={13} /> {a}</span>;
            })}
          </div>

          <h3>กฎของที่พัก</h3>
          <ul className="bullet-list">{room.rules.map((r) => <li key={r}>{r}</li>)}</ul>

          <h3>นโยบายการยกเลิก</h3>
          <p className="body-text">{room.cancelPolicy}</p>
        </div>

        <aside className="booking-panel">
          <div className="price-big">฿{money(room.price)} <span>{room.priceLabel && room.priceLabel.includes("–") ? "เริ่มต้น / คืน" : "/ คืน"}</span></div>
          {room.priceLabel && <p className="muted small-note" style={{ marginTop: -8 }}>ช่วงราคา {room.priceLabel}</p>}
          <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => go("booking", room.id)}>จองห้องพัก</button>
          <p className="muted small-note">ยังไม่มีการเรียกเก็บเงินในขั้นตอนนี้</p>
        </aside>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE: BOOKING FORM                                                 */
/* ------------------------------------------------------------------ */

function BookingPage({ roomId, go, searchForm, addBooking }) {
  const room = INITIAL_ROOMS.find((r) => r.id === roomId) || INITIAL_ROOMS[0];
  const [form, setForm] = useState({
    checkin: searchForm.checkin,
    checkout: searchForm.checkout,
    guests: searchForm.guests || 1,
    roomsQty: 1,
    fullName: "",
    phone: "",
    email: "",
    note: "",
  });
  const [error, setError] = useState("");

  const nights = nightsBetween(form.checkin, form.checkout);
  const total = nights * room.price * form.roomsQty;

  function submit(e) {
    e.preventDefault();
    if (!form.checkin || !form.checkout || nights <= 0) {
      setError("กรุณาเลือกวันเข้าพักและวันออกให้ถูกต้อง");
      return;
    }
    if (!form.fullName || !form.phone) {
      setError("กรุณากรอกชื่อผู้จองและเบอร์โทรศัพท์");
      return;
    }
    setError("");
    const booking = {
      code: genCode(),
      roomId: room.id,
      roomName: room.name,
      ...form,
      nights,
      total,
      status: "รอการยืนยันจากที่พัก",
      createdAt: new Date().toLocaleDateString("th-TH"),
    };
    addBooking(booking);
    go("confirm", booking.code);
  }

  return (
    <div className="container section-pad narrow">
      <button className="back-link" onClick={() => go("detail", room.id)}><ChevronLeft size={16} /> กลับ</button>
      <h1>กรอกข้อมูลการจอง</h1>
      <p className="muted">{room.name} · ฿{money(room.price)} / คืน</p>

      <form className="form-card" onSubmit={submit}>
        <div className="form-row two">
          <div className="field">
            <label>วันที่เข้าพัก</label>
            <input type="date" value={form.checkin} onChange={(e) => setForm({ ...form, checkin: e.target.value })} required />
          </div>
          <div className="field">
            <label>วันที่ออก</label>
            <input type="date" value={form.checkout} onChange={(e) => setForm({ ...form, checkout: e.target.value })} required />
          </div>
        </div>

        <div className="form-row two">
          <div className="field">
            <label>จำนวนผู้เข้าพัก</label>
            <select value={form.guests} onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}>
              {Array.from({ length: room.capacity }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n} คน</option>)}
            </select>
          </div>
          <div className="field">
            <label>จำนวนห้อง</label>
            <select value={form.roomsQty} onChange={(e) => setForm({ ...form, roomsQty: Number(e.target.value) })}>
              {[1, 2, 3].map((n) => <option key={n} value={n}>{n} ห้อง</option>)}
            </select>
          </div>
        </div>

        <div className="field">
          <label>ชื่อผู้จอง</label>
          <input type="text" placeholder="ชื่อ-นามสกุล" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
        </div>

        <div className="form-row two">
          <div className="field">
            <label>เบอร์โทรศัพท์</label>
            <input type="tel" placeholder="08x-xxx-xxxx" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
          </div>
          <div className="field">
            <label>อีเมล</label>
            <input type="email" placeholder="you@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
        </div>

        <div className="field">
          <label>คำขอเพิ่มเติม</label>
          <textarea rows={3} placeholder="เช่น เตียงเสริม, เช็กอินล่วงหน้า" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="summary-box">
          <div className="summary-row"><span>ราคาห้อง × {nights || 0} คืน × {form.roomsQty} ห้อง</span><span>฿{money(total)}</span></div>
          <div className="summary-row total"><span>ยอดรวม</span><span>฿{money(total)}</span></div>
        </div>

        <button className="btn btn-primary" type="submit" style={{ width: "100%" }}>ยืนยันคำขอจอง</button>
        <p className="muted small-note">ทีมงานจะติดต่อกลับเพื่อยืนยันการชำระเงินทางโทรศัพท์หรือ LINE</p>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE: CONFIRMATION                                                 */
/* ------------------------------------------------------------------ */

function ConfirmPage({ code, bookings, go }) {
  const booking = bookings.find((b) => b.code === code);
  if (!booking) {
    return (
      <div className="container section-pad narrow" style={{ textAlign: "center" }}>
        <p>ไม่พบข้อมูลการจองนี้</p>
        <button className="btn btn-primary" onClick={() => go("home")}>กลับหน้าแรก</button>
      </div>
    );
  }
  return (
    <div className="container section-pad narrow">
      <div className="confirm-card">
        <CheckCircle2 size={48} color="#2E5F58" />
        <h1>จองสำเร็จ</h1>
        <p className="muted">ขอบคุณที่เลือกพักกับบ้านริมมอญ</p>
        <div className="confirm-code">{booking.code}</div>

        <ul className="spec-list">
          <li><span>ที่พัก</span><span>{booking.roomName}</span></li>
          <li><span>วันที่เข้าพัก</span><span>{booking.checkin} — {booking.checkout}</span></li>
          <li><span>จำนวนคืน</span><span>{booking.nights} คืน</span></li>
          <li><span>ยอดรวม</span><span>฿{money(booking.total)}</span></li>
          <li><span>สถานะ</span><span className="badge pending">{booking.status}</span></li>
        </ul>

        <p className="body-text">ทีมงานจะติดต่อยืนยันและแจ้งช่องทางชำระเงินผ่านเบอร์โทรหรือ LINE ที่ท่านให้ไว้ภายใน 24 ชั่วโมง</p>

        <div className="confirm-actions">
          <button className="btn btn-outline" onClick={() => go("mybookings")}>ดูรายละเอียดการจอง</button>
          <button className="btn btn-primary" onClick={() => go("home")}>กลับหน้าแรก</button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE: MY BOOKINGS                                                  */
/* ------------------------------------------------------------------ */

function MyBookingsPage({ user, bookings, go, cancelBooking }) {
  if (!user.loggedIn) {
    return (
      <div className="container section-pad narrow" style={{ textAlign: "center" }}>
        <h2>กรุณาเข้าสู่ระบบ</h2>
        <p className="muted">เข้าสู่ระบบเพื่อดูประวัติการจองของคุณ</p>
        <button className="btn btn-primary" onClick={() => go("login")}>เข้าสู่ระบบ</button>
      </div>
    );
  }
  return (
    <div className="container section-pad">
      <h1>การจองของฉัน</h1>
      {bookings.length === 0 ? (
        <div className="empty-state">
          <p>ยังไม่มีรายการจอง</p>
          <button className="btn btn-primary" onClick={() => go("search")}>ค้นหาห้องพัก</button>
        </div>
      ) : (
        <div className="booking-list">
          {bookings.map((b) => (
            <div key={b.code} className="booking-item">
              <div>
                <div className="booking-item-top">
                  <strong>{b.roomName}</strong>
                  <span className={`badge ${b.status === "ยืนยันแล้ว" ? "confirmed" : b.status === "ยกเลิกแล้ว" ? "cancelled" : "pending"}`}>{b.status}</span>
                </div>
                <div className="muted">รหัสจอง {b.code} · {b.checkin} — {b.checkout} ({b.nights} คืน)</div>
                <div className="muted">ผู้ติดต่อ: {b.phone}</div>
              </div>
              <div className="booking-item-right">
                <div className="price"><strong>฿{money(b.total)}</strong></div>
                {b.status !== "ยกเลิกแล้ว" && (
                  <button className="btn btn-outline small" onClick={() => cancelBooking(b.code)}>ยกเลิกการจอง</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE: MAP & ATTRACTIONS                                            */
/* ------------------------------------------------------------------ */

function MapPage() {
  return (
    <div className="container section-pad">
      <h1>แผนที่และสถานที่ท่องเที่ยว</h1>
      <p className="muted">ที่พักตั้งอยู่ริมสะพานมอญ อำเภอสังขละบุรี จังหวัดกาญจนบุรี</p>

      <div className="map-mock">
        <svg viewBox="0 0 800 320" width="100%" height="260">
          <rect width="800" height="320" fill="#EFE8D3" />
          <path d="M0 200 Q 200 160 400 210 T 800 190" stroke="#2E5F58" strokeWidth="26" fill="none" opacity="0.5" />
          <path d="M0 300 L200 300 L200 220 L500 220 L500 300 L800 300" stroke="#C9BE9C" strokeWidth="10" fill="none" />
          <circle cx="400" cy="205" r="10" fill="#C98A3B" />
          <text x="415" y="200" fontSize="14" fill="#2A211A" fontFamily="sans-serif">บ้านริมมอญ (ที่พัก)</text>
          <circle cx="330" cy="150" r="6" fill="#4A3527" />
          <text x="342" y="150" fontSize="12" fill="#2A211A" fontFamily="sans-serif">วัดวังก์วิเวการาม</text>
          <circle cx="520" cy="130" r="6" fill="#4A3527" />
          <text x="532" y="130" fontSize="12" fill="#2A211A" fontFamily="sans-serif">เจดีย์พุทธคยา</text>
          <circle cx="250" cy="240" r="6" fill="#4A3527" />
          <text x="262" y="244" fontSize="12" fill="#2A211A" fontFamily="sans-serif">ตลาดมอญเช้า</text>
        </svg>
        <p className="muted small-note" style={{ textAlign: "center" }}>แผนที่แสดงตำแหน่งโดยประมาณเพื่อการนำเสนอ</p>
      </div>

      <div className="how-to-get">
        <Navigation size={18} />
        <span>จากตัวเมืองสังขละบุรี ขับรถตามถนนริมน้ำ 10 นาทีถึงที่พัก มีป้ายบอกทางตลอดเส้นทาง หรือแจ้งทีมงานให้ไปรับที่สถานีขนส่ง</span>
      </div>

      <PlankDivider />

      <h2>สถานที่ท่องเที่ยวใกล้เคียง</h2>
      <div className="attraction-grid">
        {ATTRACTIONS.map((a) => (
          <div key={a.name} className="attraction-card">
            <Camera size={18} />
            <div>
              <div className="attraction-name">{a.name}</div>
              <div className="muted">ห่างจากที่พัก {a.distance}</div>
              <p className="body-text small">{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE: REVIEWS                                                      */
/* ------------------------------------------------------------------ */

function ReviewsPage({ reviews, addReview }) {
  const [form, setForm] = useState({ name: "", room: INITIAL_ROOMS[0].name, clean: 5, service: 5, location: 5, value: 5, comment: "" });
  const [submitted, setSubmitted] = useState(false);

  const avg = (key) => (reviews.reduce((s, r) => s + r[key], 0) / reviews.length).toFixed(1);

  function submit(e) {
    e.preventDefault();
    if (!form.name || !form.comment) return;
    addReview({ id: "v" + Date.now(), ...form, date: "วันนี้" });
    setForm({ name: "", room: INITIAL_ROOMS[0].name, clean: 5, service: 5, location: 5, value: 5, comment: "" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="container section-pad">
      <h1>รีวิวจากผู้เข้าพัก</h1>

      <div className="review-summary">
        <div className="review-score-big">{(reviews.reduce((s, r) => s + (r.clean + r.service + r.location + r.value) / 4, 0) / reviews.length).toFixed(1)}</div>
        <div className="review-score-bars">
          <div>ความสะอาด <StarRating value={Number(avg("clean"))} /></div>
          <div>การบริการ <StarRating value={Number(avg("service"))} /></div>
          <div>ทำเล <StarRating value={Number(avg("location"))} /></div>
          <div>ความคุ้มค่า <StarRating value={Number(avg("value"))} /></div>
        </div>
      </div>

      <div className="review-list">
        {reviews.map((r) => (
          <div key={r.id} className="review-item">
            <div className="review-item-top">
              <strong>{r.name}</strong>
              <span className="muted">{r.date}</span>
            </div>
            <div className="muted small-note">พักที่ {r.room}</div>
            <p className="body-text">{r.comment}</p>
          </div>
        ))}
      </div>

      <PlankDivider />

      <h2>เขียนรีวิว</h2>
      <form className="form-card" onSubmit={submit}>
        <div className="form-row two">
          <div className="field">
            <label>ชื่อของคุณ</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="field">
            <label>ห้องที่เข้าพัก</label>
            <select value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })}>
              {INITIAL_ROOMS.map((r) => <option key={r.id} value={r.name}>{r.name}</option>)}
            </select>
          </div>
        </div>
        <div className="form-row four">
          {["clean", "service", "location", "value"].map((k) => (
            <div className="field" key={k}>
              <label>{{ clean: "ความสะอาด", service: "การบริการ", location: "ทำเล", value: "ความคุ้มค่า" }[k]}</label>
              <select value={form[k]} onChange={(e) => setForm({ ...form, [k]: Number(e.target.value) })}>
                {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} ดาว</option>)}
              </select>
            </div>
          ))}
        </div>
        <div className="field">
          <label>ความคิดเห็นเพิ่มเติม</label>
          <textarea rows={3} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} required />
        </div>
        <button className="btn btn-primary" type="submit">ส่งรีวิว</button>
        {submitted && <p className="form-success">ขอบคุณสำหรับรีวิวของคุณ</p>}
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE: ABOUT / CONTACT                                              */
/* ------------------------------------------------------------------ */

function AboutPage() {
  const [openFaq, setOpenFaq] = useState(null);
  return (
    <div className="container section-pad">
      <h1>เกี่ยวกับเรา / ติดต่อเรา</h1>
      <p className="body-text">
        บ้านริมมอญเปิดต้อนรับนักเดินทางมากว่า 10 ปี ด้วยความตั้งใจให้ทุกคนได้สัมผัสวิถีชีวิตริมสะพานมอญ
        อย่างใกล้ชิด ทีมงานของเราเป็นคนในพื้นที่ที่พร้อมแนะนำเส้นทางท่องเที่ยว ร้านอาหาร และวัฒนธรรมมอญให้กับผู้มาเยือน
      </p>

      <div className="contact-grid">
        <div className="contact-card"><Phone size={18} /> <div><div className="label-sm">โทรศัพท์</div>08x-xxx-xxxx</div></div>
        <div className="contact-card"><MessageCircle size={18} /> <div><div className="label-sm">LINE</div>@baanrimmon</div></div>
        <div className="contact-card"><User size={18} /> <div><div className="label-sm">Facebook</div>บ้านริมมอญ - Baan Rim Mon</div></div>
        <div className="contact-card"><Mail size={18} /> <div><div className="label-sm">อีเมล</div>hello@baanrimmon.com</div></div>
        <div className="contact-card"><Clock size={18} /> <div><div className="label-sm">เวลาติดต่อ</div>ทุกวัน 07:00 - 21:00 น.</div></div>
        <div className="contact-card"><MapPin size={18} /> <div><div className="label-sm">ที่อยู่</div>ริมสะพานมอญ ต.หนองลู อ.สังขละบุรี จ.กาญจนบุรี</div></div>
      </div>

      <PlankDivider />

      <h2>คำถามที่พบบ่อย</h2>
      <div className="faq-list">
        {FAQS.map((f, i) => (
          <div key={i} className="faq-item">
            <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              {f.q}
              <ChevronDown size={16} className={openFaq === i ? "rotated" : ""} />
            </button>
            {openFaq === i && <p className="faq-a">{f.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE: LOGIN / REGISTER                                             */
/* ------------------------------------------------------------------ */

function LoginPage({ onLogin, go }) {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  function submit(e) {
    e.preventDefault();
    onLogin(form.name || form.email.split("@")[0] || "ผู้เข้าพัก");
    go("mybookings");
  }

  return (
    <div className="container section-pad narrow">
      <div className="auth-card">
        <div className="auth-tabs">
          <button className={tab === "login" ? "active" : ""} onClick={() => setTab("login")}>เข้าสู่ระบบ</button>
          <button className={tab === "register" ? "active" : ""} onClick={() => setTab("register")}>สมัครสมาชิก</button>
          <button className={tab === "forgot" ? "active" : ""} onClick={() => setTab("forgot")}>ลืมรหัสผ่าน</button>
        </div>

        {tab !== "forgot" ? (
          <form onSubmit={submit}>
            {tab === "register" && (
              <div className="field">
                <label>ชื่อ-นามสกุล</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
            )}
            <div className="field">
              <label>อีเมล</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="field">
              <label>รหัสผ่าน</label>
              <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            </div>
            <button className="btn btn-primary" style={{ width: "100%" }} type="submit">
              {tab === "login" ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
            </button>
          </form>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setTab("login"); }}>
            <div className="field">
              <label>อีเมลที่ใช้สมัคร</label>
              <input type="email" required />
            </div>
            <button className="btn btn-primary" style={{ width: "100%" }} type="submit">ส่งลิงก์ตั้งรหัสผ่านใหม่</button>
          </form>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE: ADMIN                                                        */
/* ------------------------------------------------------------------ */

function AdminPage({ rooms, setRooms, bookings, setBookings, reviews, setReviews, promos, setPromos }) {
  const [tab, setTab] = useState("overview");
  const [newRoom, setNewRoom] = useState({ name: "", type: "ห้องมาตรฐาน", price: "", capacity: 2, distance: "" });
  const [newPromo, setNewPromo] = useState({ title: "", desc: "" });

  const pendingCount = bookings.filter((b) => b.status === "รอการยืนยันจากที่พัก").length;

  function addRoom(e) {
    e.preventDefault();
    if (!newRoom.name || !newRoom.price) return;
    setRooms([...rooms, {
      id: "r" + Date.now(), name: newRoom.name, type: newRoom.type, price: Number(newRoom.price),
      capacity: Number(newRoom.capacity), beds: "เตียงใหญ่ 1 เตียง", distance: Number(newRoom.distance) || 0,
      rating: 5.0, reviewCount: 0, amenities: ["Wi-Fi ฟรี"], desc: "", checkin: "14:00", checkout: "12:00",
      rules: [], cancelPolicy: "ยกเลิกฟรีก่อนเข้าพัก 3 วัน",
    }]);
    setNewRoom({ name: "", type: "ห้องมาตรฐาน", price: "", capacity: 2, distance: "" });
  }

  function addPromo(e) {
    e.preventDefault();
    if (!newPromo.title) return;
    setPromos([...promos, { id: "p" + Date.now(), ...newPromo }]);
    setNewPromo({ title: "", desc: "" });
  }

  const tabs = [
    { id: "overview", label: "ภาพรวม", icon: BarChart3 },
    { id: "rooms", label: "จัดการห้องพัก", icon: Settings },
    { id: "bookings", label: "รายการจอง", icon: ClipboardList },
    { id: "reviews", label: "จัดการรีวิว", icon: Star },
    { id: "promos", label: "จัดการโปรโมชั่น", icon: Tag },
  ];

  return (
    <div className="container section-pad">
      <div className="admin-header">
        <ShieldCheck size={22} />
        <h1>แผงควบคุมแอดมิน</h1>
      </div>

      <div className="admin-tabs">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button key={t.id} className={`admin-tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
              <Icon size={15} /> {t.label}
            </button>
          );
        })}
      </div>

      {tab === "overview" && (
        <div className="admin-stats">
          <div className="stat-card"><div className="stat-num">{rooms.length}</div><div>ห้องพักทั้งหมด</div></div>
          <div className="stat-card"><div className="stat-num">{bookings.length}</div><div>การจองทั้งหมด</div></div>
          <div className="stat-card"><div className="stat-num">{pendingCount}</div><div>รอยืนยันการชำระเงิน</div></div>
          <div className="stat-card"><div className="stat-num">{reviews.length}</div><div>รีวิวทั้งหมด</div></div>
        </div>
      )}

      {tab === "rooms" && (
        <div>
          <table className="admin-table">
            <thead><tr><th>ชื่อห้อง</th><th>ประเภท</th><th>ราคา/คืน</th><th>รับได้ (คน)</th><th></th></tr></thead>
            <tbody>
              {rooms.map((r) => (
                <tr key={r.id}>
                  <td>{r.name}</td><td>{r.type}</td><td>฿{money(r.price)}</td><td>{r.capacity}</td>
                  <td><button className="icon-btn" onClick={() => setRooms(rooms.filter((x) => x.id !== r.id))}><Trash2 size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ marginTop: 24 }}>เพิ่มห้องพักใหม่</h3>
          <form className="form-card" onSubmit={addRoom}>
            <div className="form-row two">
              <div className="field"><label>ชื่อห้อง</label><input value={newRoom.name} onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })} /></div>
              <div className="field"><label>ประเภท</label>
                <select value={newRoom.type} onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}>
                  {["ห้องมาตรฐาน", "ห้องดีลักซ์", "เรือนครอบครัว", "เรือนส่วนตัว", "เรือนธีม"].map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row two">
              <div className="field"><label>ราคาต่อคืน (บาท)</label><input type="number" value={newRoom.price} onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })} /></div>
              <div className="field"><label>จำนวนผู้เข้าพักสูงสุด</label><input type="number" value={newRoom.capacity} onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })} /></div>
            </div>
            <button className="btn btn-primary" type="submit"><Plus size={16} /> เพิ่มห้องพัก</button>
          </form>
        </div>
      )}

      {tab === "bookings" && (
        <table className="admin-table">
          <thead><tr><th>รหัสจอง</th><th>ห้อง</th><th>ผู้จอง</th><th>วันที่</th><th>ยอดรวม</th><th>สถานะ</th><th></th></tr></thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.code}>
                <td>{b.code}</td><td>{b.roomName}</td><td>{b.fullName}<br /><span className="muted small-note">{b.phone}</span></td>
                <td>{b.checkin} — {b.checkout}</td><td>฿{money(b.total)}</td>
                <td><span className={`badge ${b.status === "ยืนยันแล้ว" ? "confirmed" : b.status === "ยกเลิกแล้ว" ? "cancelled" : "pending"}`}>{b.status}</span></td>
                <td className="admin-row-actions">
                  {b.status === "รอการยืนยันจากที่พัก" && (
                    <button className="btn btn-outline small" onClick={() => setBookings(bookings.map((x) => x.code === b.code ? { ...x, status: "ยืนยันแล้ว" } : x))}>ยืนยันการชำระเงิน</button>
                  )}
                  {b.status !== "ยกเลิกแล้ว" && (
                    <button className="icon-btn" onClick={() => setBookings(bookings.map((x) => x.code === b.code ? { ...x, status: "ยกเลิกแล้ว" } : x))}><Trash2 size={16} /></button>
                  )}
                </td>
              </tr>
            ))}
            {bookings.length === 0 && <tr><td colSpan={7} className="muted" style={{ padding: 16 }}>ยังไม่มีรายการจอง</td></tr>}
          </tbody>
        </table>
      )}

      {tab === "reviews" && (
        <table className="admin-table">
          <thead><tr><th>ผู้รีวิว</th><th>ห้อง</th><th>ความคิดเห็น</th><th></th></tr></thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r.id}>
                <td>{r.name}</td><td>{r.room}</td><td className="review-cell">{r.comment}</td>
                <td><button className="icon-btn" onClick={() => setReviews(reviews.filter((x) => x.id !== r.id))}><Trash2 size={16} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {tab === "promos" && (
        <div>
          <table className="admin-table">
            <thead><tr><th>โปรโมชั่น</th><th>รายละเอียด</th><th></th></tr></thead>
            <tbody>
              {promos.map((p) => (
                <tr key={p.id}>
                  <td>{p.title}</td><td>{p.desc}</td>
                  <td><button className="icon-btn" onClick={() => setPromos(promos.filter((x) => x.id !== p.id))}><Trash2 size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 style={{ marginTop: 24 }}>เพิ่มโปรโมชั่น</h3>
          <form className="form-card" onSubmit={addPromo}>
            <div className="field"><label>ชื่อโปรโมชั่น</label><input value={newPromo.title} onChange={(e) => setNewPromo({ ...newPromo, title: e.target.value })} /></div>
            <div className="field"><label>รายละเอียด</label><input value={newPromo.desc} onChange={(e) => setNewPromo({ ...newPromo, desc: e.target.value })} /></div>
            <button className="btn btn-primary" type="submit"><Plus size={16} /> เพิ่มโปรโมชั่น</button>
          </form>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  APP SHELL                                                          */
/* ------------------------------------------------------------------ */

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [confirmCode, setConfirmCode] = useState(null);
  const [searchForm, setSearchForm] = useState({ checkin: "", checkout: "", guests: 2 });
  const [user, setUser] = useState({ loggedIn: false, name: "" });

  const [rooms, setRooms] = useState(INITIAL_ROOMS);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [promos, setPromos] = useState(INITIAL_PROMOS);

  function go(target, param) {
    if (target === "detail") setSelectedRoomId(param);
    if (target === "booking") setSelectedRoomId(param);
    if (target === "confirm") setConfirmCode(param);
    setPage(target);
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  function doSearch() { go("search"); }
  function addBooking(b) { setBookings((prev) => [b, ...prev]); }
  function cancelBooking(code) { setBookings((prev) => prev.map((b) => (b.code === code ? { ...b, status: "ยกเลิกแล้ว" } : b))); }
  function addReview(r) { setReviews((prev) => [r, ...prev]); }
  function onLogin(name) { setUser({ loggedIn: true, name }); }
  function onLogout() { setUser({ loggedIn: false, name: "" }); }

  return (
    <div className="app-root">
      <style>{CSS}</style>
      <NavBar page={page} go={go} user={user} onLogout={onLogout} />

      {page === "home" && <HomePage go={go} searchForm={searchForm} setSearchForm={setSearchForm} doSearch={doSearch} />}
      {page === "search" && <SearchPage go={go} searchForm={searchForm} setSearchForm={setSearchForm} />}
      {page === "detail" && <DetailPage roomId={selectedRoomId} go={go} />}
      {page === "booking" && <BookingPage roomId={selectedRoomId} go={go} searchForm={searchForm} addBooking={addBooking} />}
      {page === "confirm" && <ConfirmPage code={confirmCode} bookings={bookings} go={go} />}
      {page === "mybookings" && <MyBookingsPage user={user} bookings={bookings} go={go} cancelBooking={cancelBooking} />}
      {page === "map" && <MapPage />}
      {page === "reviews" && <ReviewsPage reviews={reviews} addReview={addReview} />}
      {page === "about" && <AboutPage />}
      {page === "login" && <LoginPage onLogin={onLogin} go={go} />}
      {page === "admin" && (
        <AdminPage
          rooms={rooms} setRooms={setRooms}
          bookings={bookings} setBookings={setBookings}
          reviews={reviews} setReviews={setReviews}
          promos={promos} setPromos={setPromos}
        />
      )}

      <div className="admin-entry-wrap container">
        <button className="admin-entry" onClick={() => go("admin")}><Settings size={13} /> สำหรับผู้ดูแลระบบ</button>
      </div>

      <Footer go={go} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CSS                                                                 */
/* ------------------------------------------------------------------ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Taviraj:wght@400;500;600;700&family=Sarabun:wght@400;500;600;700&display=swap');

.app-root {
  --paper: #F6F1E4;
  --paper-2: #EFE8D3;
  --ink: #2A211A;
  --wood: #4A3527;
  --wood-2: #6B4226;
  --teal: #2E5F58;
  --teal-2: #3E6E68;
  --gold: #C98A3B;
  --moss: #7C8B5B;
  --line: #DCD3B6;
  font-family: 'Sarabun', sans-serif;
  color: var(--ink);
  background: var(--paper);
  min-height: 100vh;
}
.app-root * { box-sizing: border-box; }
h1, h2, h3 { font-family: 'Taviraj', serif; color: var(--wood); font-weight: 600; margin: 0 0 12px; }
h1 { font-size: 30px; }
h2 { font-size: 24px; }
h3 { font-size: 18px; margin-top: 22px; }
p { line-height: 1.7; }
.container { max-width: 1080px; margin: 0 auto; padding: 0 20px; }
.narrow { max-width: 640px; }
.section-pad { padding: 40px 20px 60px; }
.muted { color: #6B6255; }
.small-note { font-size: 13px; }
.body-text { color: #43392E; }
.body-text.small { font-size: 13.5px; }

/* Nav */
.nav { position: sticky; top: 0; z-index: 20; background: rgba(246,241,228,0.95); backdrop-filter: blur(6px); border-bottom: 1px solid var(--line); }
.nav-inner { max-width: 1080px; margin: 0 auto; padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.brand { display: flex; align-items: center; gap: 10px; background: none; border: none; cursor: pointer; }
.brand-mark { width: 34px; height: 34px; border-radius: 50%; background: var(--teal); color: var(--paper); display: flex; align-items: center; justify-content: center; font-family: 'Taviraj', serif; font-size: 13px; }
.brand-name { font-family: 'Taviraj', serif; font-size: 19px; color: var(--wood); font-weight: 600; }
.nav-links { display: flex; gap: 4px; }
.nav-link { background: none; border: none; padding: 8px 12px; font-family: 'Sarabun', sans-serif; font-size: 14.5px; color: var(--ink); cursor: pointer; border-radius: 6px; }
.nav-link:hover { background: var(--paper-2); }
.nav-link.active { color: var(--teal); font-weight: 600; }
.nav-actions { display: flex; align-items: center; gap: 8px; }
.nav-mobile { display: flex; flex-direction: column; padding: 6px 0 14px; border-top: 1px solid var(--line); }
.nav-mobile-link { text-align: left; background: none; border: none; padding: 12px 20px; font-size: 15px; }

.desktop-only { display: flex; }
.mobile-only { display: none; }
@media (max-width: 860px) {
  .desktop-only { display: none; }
  .mobile-only { display: flex; }
}

/* Buttons */
.btn { font-family: 'Sarabun', sans-serif; font-size: 14.5px; font-weight: 600; border-radius: 8px; padding: 11px 18px; cursor: pointer; border: none; display: inline-flex; align-items: center; justify-content: center; gap: 6px; transition: transform .12s ease, background .15s ease; }
.btn:active { transform: scale(0.98); }
.btn-primary { background: var(--teal); color: var(--paper); }
.btn-primary:hover { background: var(--teal-2); }
.btn-outline { background: transparent; color: var(--wood); border: 1.5px solid var(--wood-2); }
.btn-outline:hover { background: var(--paper-2); }
.btn-ghost { background: none; color: var(--ink); }
.btn.small { padding: 8px 13px; font-size: 13.5px; }
.icon-btn { background: none; border: none; cursor: pointer; color: var(--wood); padding: 6px; border-radius: 6px; }
.icon-btn:hover { background: var(--paper-2); }

/* Hero */
.hero { position: relative; overflow: hidden; }
.bridge-illust { width: 100%; height: 340px; display: block; }
.bridge-illust.compact { height: 200px; }
.hero-content { position: absolute; left: 0; right: 0; bottom: 28px; }
.eyebrow-plain { color: var(--wood-2); font-size: 14px; margin: 0 0 6px; }
.hero-title { font-size: 40px; line-height: 1.2; margin: 0 0 10px; text-shadow: 0 2px 14px rgba(246,241,228,0.7); }
.hero-sub { max-width: 480px; color: #3B3327; font-size: 15.5px; }
@media (max-width: 640px) { .hero-title { font-size: 28px; } .bridge-illust { height: 260px; } }

/* Search box */
.search-box-wrap { margin-top: -34px; position: relative; z-index: 2; }
.search-box { background: #fff; border: 1px solid var(--line); border-radius: 14px; padding: 18px; display: flex; flex-wrap: wrap; gap: 14px; align-items: flex-end; box-shadow: 0 10px 30px rgba(74,53,39,0.10); }
.field { display: flex; flex-direction: column; gap: 6px; flex: 1; min-width: 130px; }
.field label { font-size: 12.5px; color: var(--wood-2); font-weight: 600; }
.field input, .field select, .field textarea { font-family: 'Sarabun', sans-serif; padding: 10px 12px; border: 1.5px solid var(--line); border-radius: 8px; font-size: 14.5px; background: #fff; color: var(--ink); }
.field input:focus, .field select:focus, .field textarea:focus { outline: 2px solid var(--teal); outline-offset: 1px; border-color: var(--teal); }
.search-btn { flex: 0 0 auto; }

.perks { display: flex; gap: 26px; flex-wrap: wrap; padding: 28px 20px 8px; }
.perk { display: flex; align-items: center; gap: 8px; color: var(--wood-2); font-size: 14.5px; }

.plank-divider { height: 10px; background-repeat: repeat-x; background-size: 42px 10px; background-image: repeating-linear-gradient(90deg, var(--line), var(--line) 34px, transparent 34px, transparent 42px); opacity: 0.7; margin: 0; }

.section-head { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 18px; }
.link-more { background: none; border: none; color: var(--teal); font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 2px; }

/* Room cards */
.room-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
@media (max-width: 900px) { .room-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 620px) { .room-grid { grid-template-columns: 1fr; } }

.room-card { background: #fff; border: 1px solid var(--line); border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; }
.room-thumb { height: 140px; position: relative; }
.room-thumb-svg { width: 100%; height: 100%; }
.room-card-body { padding: 14px 16px 16px; display: flex; flex-direction: column; gap: 8px; }
.room-card-top { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
.room-card-top h3 { font-size: 16.5px; margin: 0; }
.star-rating { display: inline-flex; align-items: center; gap: 3px; font-size: 13.5px; font-weight: 600; color: var(--wood-2); }
.room-meta { display: flex; gap: 14px; flex-wrap: wrap; font-size: 13px; color: #6B6255; }
.room-meta span { display: flex; align-items: center; gap: 4px; }
.room-amenities { display: flex; flex-wrap: wrap; gap: 6px; }
.amenity-chip { display: flex; align-items: center; gap: 4px; background: var(--paper-2); color: var(--wood-2); font-size: 12px; padding: 4px 8px; border-radius: 20px; }
.room-card-bottom { display: flex; justify-content: space-between; align-items: center; margin-top: 4px; }
.price { font-size: 15px; }
.price strong { color: var(--wood); font-size: 17px; }

.promo-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
@media (max-width: 640px) { .promo-grid { grid-template-columns: 1fr; } }
.promo-card { display: flex; gap: 12px; background: #fff; border: 1px solid var(--line); border-left: 4px solid var(--gold); border-radius: 10px; padding: 16px; color: var(--wood-2); }
.promo-title { font-weight: 600; color: var(--wood); margin-bottom: 2px; }
.promo-desc { font-size: 13.5px; color: #6B6255; }

/* Search page */
.search-layout { display: grid; grid-template-columns: 240px 1fr; gap: 28px; margin-top: 20px; }
@media (max-width: 780px) { .search-layout { grid-template-columns: 1fr; } }
.filters { display: flex; flex-direction: column; gap: 16px; align-self: start; position: sticky; top: 90px; }
.filter-block { display: flex; flex-direction: column; gap: 6px; }
.filter-block label { font-size: 12.5px; font-weight: 600; color: var(--wood-2); }
.filter-block input, .filter-block select { padding: 9px 10px; border: 1.5px solid var(--line); border-radius: 7px; font-family: 'Sarabun', sans-serif; }

/* Detail page */
.back-link { background: none; border: none; color: var(--wood-2); cursor: pointer; display: flex; align-items: center; gap: 4px; margin-bottom: 16px; font-size: 14px; }
.detail-gallery { display: grid; grid-template-columns: 2fr 1fr; gap: 10px; margin-bottom: 24px; }
.detail-gallery .room-thumb { height: 320px; border-radius: 12px; }
.detail-gallery-side { display: grid; grid-template-rows: 1fr 1fr; gap: 10px; }
.detail-gallery-side .room-thumb { height: 155px; border-radius: 12px; }
@media (max-width: 700px) { .detail-gallery { grid-template-columns: 1fr; } .detail-gallery .room-thumb { height: 200px; } .detail-gallery-side { display: none; } }

.detail-layout { display: grid; grid-template-columns: 1fr 300px; gap: 40px; align-items: start; }
@media (max-width: 860px) { .detail-layout { grid-template-columns: 1fr; } }
.spec-list { list-style: none; padding: 0; margin: 0 0 16px; display: flex; flex-direction: column; gap: 8px; }
.spec-list li { display: flex; justify-content: space-between; border-bottom: 1px dashed var(--line); padding-bottom: 8px; font-size: 14.5px; }
.spec-list li span:first-child { color: #6B6255; }
.bullet-list { padding-left: 20px; color: #43392E; line-height: 1.9; }
.room-type-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 8px; }
.room-type-item { display: flex; gap: 10px; align-items: flex-start; background: var(--paper-2); border-radius: 10px; padding: 12px 14px; }
.room-type-item svg { color: var(--wood-2); margin-top: 2px; flex-shrink: 0; }
.room-type-name { font-weight: 600; color: var(--wood); font-size: 14.5px; }
.booking-panel { background: #fff; border: 1px solid var(--line); border-radius: 12px; padding: 20px; position: sticky; top: 90px; display: flex; flex-direction: column; gap: 12px; }
.price-big { font-family: 'Taviraj', serif; font-size: 26px; color: var(--wood); }
.price-big span { font-size: 14px; color: #6B6255; font-family: 'Sarabun', sans-serif; }

/* Forms */
.form-card { background: #fff; border: 1px solid var(--line); border-radius: 12px; padding: 22px; display: flex; flex-direction: column; gap: 14px; margin-top: 14px; }
.form-row { display: grid; gap: 14px; }
.form-row.two { grid-template-columns: 1fr 1fr; }
.form-row.four { grid-template-columns: repeat(4, 1fr); }
@media (max-width: 620px) { .form-row.two, .form-row.four { grid-template-columns: 1fr 1fr; } }
.form-error { color: #B23A2E; font-size: 14px; margin: 0; }
.form-success { color: var(--teal); font-size: 14px; margin: 0; font-weight: 600; }
.summary-box { border-top: 1px solid var(--line); padding-top: 12px; display: flex; flex-direction: column; gap: 6px; }
.summary-row { display: flex; justify-content: space-between; font-size: 14px; color: #6B6255; }
.summary-row.total { font-weight: 700; color: var(--wood); font-size: 17px; }

/* Confirm */
.confirm-card { background: #fff; border: 1px solid var(--line); border-radius: 14px; padding: 34px 28px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 4px; }
.confirm-card ul { text-align: left; width: 100%; margin-top: 14px; }
.confirm-code { font-family: 'Taviraj', serif; font-size: 22px; letter-spacing: 2px; color: var(--teal); background: var(--paper-2); padding: 8px 20px; border-radius: 8px; margin: 12px 0; }
.confirm-actions { display: flex; gap: 12px; margin-top: 16px; flex-wrap: wrap; justify-content: center; }

/* Bookings list */
.booking-list { display: flex; flex-direction: column; gap: 12px; }
.booking-item { background: #fff; border: 1px solid var(--line); border-radius: 12px; padding: 16px 18px; display: flex; justify-content: space-between; gap: 14px; flex-wrap: wrap; }
.booking-item-top { display: flex; align-items: center; gap: 10px; margin-bottom: 4px; }
.booking-item-right { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
.empty-state { text-align: center; padding: 50px 20px; display: flex; flex-direction: column; align-items: center; gap: 14px; }

.badge { font-size: 12px; padding: 3px 10px; border-radius: 20px; font-weight: 600; }
.badge.pending { background: #F3E3C4; color: #8A5A16; }
.badge.confirmed { background: #DCE9DB; color: var(--teal); }
.badge.cancelled { background: #F1DAD6; color: #B23A2E; }

/* Map */
.map-mock { background: #fff; border: 1px solid var(--line); border-radius: 12px; padding: 14px; margin: 16px 0 20px; }
.how-to-get { display: flex; gap: 10px; align-items: flex-start; background: var(--paper-2); border-radius: 10px; padding: 14px 16px; color: var(--wood-2); font-size: 14.5px; }
.attraction-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 16px; }
@media (max-width: 700px) { .attraction-grid { grid-template-columns: 1fr; } }
.attraction-card { display: flex; gap: 12px; background: #fff; border: 1px solid var(--line); border-radius: 10px; padding: 16px; }
.attraction-name { font-weight: 600; color: var(--wood); }

/* Reviews */
.review-summary { display: flex; gap: 24px; align-items: center; background: #fff; border: 1px solid var(--line); border-radius: 12px; padding: 22px; margin-bottom: 20px; flex-wrap: wrap; }
.review-score-big { font-family: 'Taviraj', serif; font-size: 44px; color: var(--wood); }
.review-score-bars { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 24px; font-size: 14px; }
.review-list { display: flex; flex-direction: column; gap: 14px; margin-bottom: 10px; }
.review-item { background: #fff; border: 1px solid var(--line); border-radius: 10px; padding: 16px 18px; }
.review-item-top { display: flex; justify-content: space-between; margin-bottom: 2px; }

/* About */
.contact-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin: 18px 0; }
@media (max-width: 780px) { .contact-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 500px) { .contact-grid { grid-template-columns: 1fr; } }
.contact-card { display: flex; gap: 10px; align-items: flex-start; background: #fff; border: 1px solid var(--line); border-radius: 10px; padding: 14px; font-size: 14px; }
.label-sm { font-size: 12px; color: var(--wood-2); font-weight: 600; margin-bottom: 2px; }
.faq-list { display: flex; flex-direction: column; border-top: 1px solid var(--line); }
.faq-item { border-bottom: 1px solid var(--line); }
.faq-q { width: 100%; background: none; border: none; text-align: left; padding: 16px 4px; font-size: 15px; font-weight: 600; color: var(--wood); display: flex; justify-content: space-between; align-items: center; cursor: pointer; }
.faq-q svg { transition: transform .15s ease; }
.faq-q svg.rotated { transform: rotate(180deg); }
.faq-a { padding: 0 4px 16px; color: #43392E; }

/* Auth */
.auth-card { background: #fff; border: 1px solid var(--line); border-radius: 14px; padding: 26px; }
.auth-tabs { display: flex; gap: 4px; margin-bottom: 18px; border-bottom: 1px solid var(--line); }
.auth-tabs button { flex: 1; background: none; border: none; padding: 10px; font-size: 14px; font-weight: 600; color: #6B6255; cursor: pointer; border-bottom: 2px solid transparent; }
.auth-tabs button.active { color: var(--teal); border-bottom-color: var(--teal); }
.auth-card .field { margin-bottom: 12px; }

/* Admin */
.admin-header { display: flex; align-items: center; gap: 10px; color: var(--wood); }
.admin-tabs { display: flex; gap: 4px; flex-wrap: wrap; border-bottom: 1px solid var(--line); margin: 16px 0 22px; }
.admin-tab { display: flex; align-items: center; gap: 6px; background: none; border: none; padding: 10px 14px; font-size: 13.5px; color: #6B6255; cursor: pointer; border-bottom: 2px solid transparent; }
.admin-tab.active { color: var(--teal); border-bottom-color: var(--teal); font-weight: 600; }
.admin-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
@media (max-width: 700px) { .admin-stats { grid-template-columns: repeat(2, 1fr); } }
.stat-card { background: #fff; border: 1px solid var(--line); border-radius: 10px; padding: 18px; text-align: center; }
.stat-num { font-family: 'Taviraj', serif; font-size: 30px; color: var(--wood); }
.admin-table { width: 100%; border-collapse: collapse; background: #fff; border: 1px solid var(--line); border-radius: 10px; overflow: hidden; font-size: 13.5px; }
.admin-table th, .admin-table td { padding: 10px 12px; text-align: left; border-bottom: 1px solid var(--line); }
.admin-table th { background: var(--paper-2); color: var(--wood-2); font-weight: 600; }
.admin-row-actions { display: flex; gap: 6px; }
.review-cell { max-width: 260px; }
.admin-entry-wrap { display: flex; justify-content: center; padding: 6px 0 30px; }
.admin-entry { background: none; border: none; color: #9A9080; font-size: 12.5px; display: flex; align-items: center; gap: 5px; cursor: pointer; }

/* Footer */
.footer { background: var(--wood); color: #E6DEC9; margin-top: 40px; }
.footer-inner { max-width: 1080px; margin: 0 auto; padding: 34px 20px; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 24px; }
@media (max-width: 700px) { .footer-inner { grid-template-columns: 1fr; } }
.footer-text { color: #C9BFA8; font-size: 14px; margin-top: 6px; }
.footer-col { display: flex; flex-direction: column; gap: 8px; font-size: 14px; }
.footer-col button { background: none; border: none; color: #C9BFA8; text-align: left; padding: 0; cursor: pointer; font-size: 14px; }
.footer-col button:hover { color: #F6F1E4; }
.footer-head { color: #F6F1E4; font-weight: 600; margin-bottom: 2px; }
.footer-bottom { text-align: center; padding: 14px; font-size: 12.5px; color: #A99B7D; border-top: 1px solid rgba(255,255,255,0.08); }
`;
