create database bruh
Go
use bruh
Go

--
-- Table structure for table "brand"
--

CREATE TABLE "brand" (
  "brandId" int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  "brandName" NVARCHAR(32)  NOT NULL
)  ;
SET IDENTITY_INSERT "brand" ON; 
--
-- Dumping data for table "brand"
--

INSERT INTO "brand" ("brandId", "brandName") VALUES
(1, 'Nike'),
(3, 'Adidas'),
(4, 'Balenciaga');
SET IDENTITY_INSERT "brand" off;
-- --------------------------------------------------------

--
-- Table structure for table "categories"
--

CREATE TABLE "categories" (
  "categoryId" int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  "categoryName" NVARCHAR(64)   NOT NULL
)  ;
SET IDENTITY_INSERT "categories" ON; 
--
-- Dumping data for table "categories"
--

INSERT INTO "categories" ("categoryId", "categoryName") VALUES
(1, 'Giày thể thao'),
(2, 'Giày thời trang'),
(3, 'Giày boot'),
(4, 'Giày boot'),
(5, 'Giày rep 1:1'),
(6, 'Giày fake 1'),
(7, 'Giày fake 2'),
(8, 'Giày auth'),
(9, 'Giày auth 2'),
(10, 'Giày auth 3'),
(11, 'Giày auth 4'),
(12, 'Giày auth 45');
SET IDENTITY_INSERT "categories" off;
-- --------------------------------------------------------

--
-- Table structure for table "orders"
--

CREATE TABLE "orders" (
  "orderId" NVARCHAR(64) NOT NULL PRIMARY KEY ,
  "userId" int NOT NULL,
  "totalPrice" bigint NOT NULL,
  "orderDate" date NOT NULL,
  "status" NVARCHAR(32)  NOT NULL,
  "expireDate" date
)   
--
-- Dumping data for table "orders"
--

INSERT INTO "orders" ("orderId", "userId", "totalPrice", "orderDate", "status") VALUES
('congson19072001_1619831685', 9, 5400000, '2021-05-01', 'processing'),
('congson19072001_1619835033', 9, 2400000, '2021-05-01', 'verifying');
-- --------------------------------------------------------
INSERT INTO "orders" ("orderId", "userId", "totalPrice", "orderDate", "status", "expireDate") VALUES ('congson1907admin_1620103003',1,900000,'2021-05-04','processing','2021-05-04');
--
-- Table structure for table "products"
--

CREATE TABLE "products" (
  "productId" int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  "productName" NVARCHAR(64)   NOT NULL,
  "categoryId" int NOT NULL,
  "description" text   NOT NULL,
  "productPrice" int NOT NULL,
  "brandId" int NOT NULL,
  "imageUrl" text   NOT NULL
)  ;
SET IDENTITY_INSERT "products" ON; 
--
-- Dumping data for table "products"
--

INSERT INTO "products" ("productId", "productName", "categoryId", "description", "productPrice", "brandId", "imageUrl") VALUES
(1, 'Giày Thể Thao Nike Jordan 1 F1 Low', 1, 'Chất liệu cao cấp, bền đẹp theo thời gian. Thiết kế thời trang. Kiểu dáng phong cách. Độ bền cao. Dễ phối đồ.\r\nMàu sắc: xám xanh, đen xám, đen trắng đỏ, đen trắng cam, đen trắng\r\nSize: 36-43,\r\nChất liệu: Da trơn\r\nPhối màu tinh tế và đẹp mắt.', 900000, 1, ''),
(2, 'Giay 3kk', 2, 'Giay sida', 500000, 3, 'dsfsdfsdfsf/dsfdsfs.jpg');
SET IDENTITY_INSERT "products" off;
-- --------------------------------------------------------

--
-- Table structure for table "product_order"
--

CREATE TABLE "product_order" (
  "orderId" NVARCHAR(64) NOT NULL,
  "productId" int NOT NULL,
  "productSize" decimal(3,1) NOT NULL,
  "quantity" smallint NOT NULL
) ;
--
-- Dumping data for table "product_order"
--
INSERT INTO "product_order" ("orderId", "productId", "productSize", "quantity") VALUES
('congson19072001_1619831685', 1, '39.5', 6),
('congson19072001_1619835033', 1, '40.0', 1),
('congson1907admin_1620103003',1,'39.0',1),
('congson19072001_1619835033', 2, '39.5', 3);
-- --------------------------------------------------------

--
-- Table structure for table "registration"
--

CREATE TABLE "registration" (
  "Id" bigint NOT NULL IDENTITY(1,1) PRIMARY KEY,
  "userName" NVARCHAR(32)   NOT NULL,
  "password" NVARCHAR(64)   NOT NULL,
  "phone" NVARCHAR(16)   NOT NULL,
  "email" NVARCHAR(64)   NOT NULL,
  "role" NVARCHAR(32) NOT NULL
)  ;
SET IDENTITY_INSERT "registration" ON; 
--
-- Dumping data for table "registration"
--

INSERT INTO "registration" ("Id", "userName", "password", "phone", "email", "role") VALUES
(1, 'congson1907admin', '$2b$10$MF5.7fE0qICU.PJ88tZhfu0aKlS4/F8E2TKe2EmxR/AuzSQDI.lxS', '094865466', 'congson1907vn@gmail.com', 'admin'),
(9, 'congson19072001', '$2b$10$MF5.7fE0qICU.PJ88tZhfu0aKlS4/F8E2TKe2EmxR/AuzSQDI.lxS', '0947918905', 'congson1907@gmail.com', 'user'),
(11, 'hosseee', '$2b$10$B.5ak.Maoko.vEGOfkt5.OEiSFY6dJW313rirQEsRf5MeQb3ZdnAC', '056459645', 'hongcong1@gmail.com','user');
SET IDENTITY_INSERT "registration" off;
-- --------------------------------------------------------

--
-- Table structure for table "storehouse"
--

CREATE TABLE "storehouse" (
  "productId" int NOT NULL,
  "productSize" decimal(3,1) NOT NULL,
  "quantity" smallint NOT NULL
)  ; 
--
-- Dumping data for table "storehouse"

INSERT INTO "storehouse" ("productId", "productSize", "quantity") VALUES
(1, '39.5', 100),
(1, '40.0', 60),
(1, '41.0', 100),
(1, '42.0', 80),
(1, '43.0', 60),
(2, '39.5', 60),
(2, '40.0', 80),
(2, '41.0', 100),
(2, '42.0', 200);
--

--
-- Indexes for table "orders"
--

--
-- Indexes for table "products

--
-- Indexes for table "product_order"

ALTER TABLE "product_order"
  ADD CONSTRAINT "productOrder" UNIQUE ("productId","orderId","productSize");
--
-- Indexes for table "registration"
--
ALTER TABLE "registration"
  ADD CONSTRAINT email UNIQUE ("email"),
  CONSTRAINT userName UNIQUE("userName");

--
-- Indexes for table "storehouse"
--
ALTER TABLE "storehouse"
  ADD CONSTRAINT "productId" UNIQUE("productId","productSize");



--

