CREATE DATABASE Bamazon;

USE Bamazon;


CREATE TABLE Products(
ItemID INT(10) auto_increment not null, 
ProductName varchar(100) not null,
DepartmentName varchar(50) not null,
Price FLOAT(8,2) not null,
StockQuantity INT(20) not null,
Primary Key(ItemId)
);