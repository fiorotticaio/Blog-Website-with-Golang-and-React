# Blog Website with Golang and React

This project is a simple blog website built with Golang (Fiber framework) and React.


## Getting Started

## Create a mysql database

- Use app xampp to create a mysql database and start the server
- Access the database in your browser by going to `http://localhost/phpmyadmin`
- Create a new database named `goblog`


## Project setup

### Prerequisites

Make sure you have Go installed on your system. You can download it from [here](https://golang.org/dl/).

### Clone the repository

```bash
git clone https://github.com/fiorotticaio/Blog-Website-with-Golang-and-React
cd Blog-Website-with-Golang-and-React
```

### Download the dependencies

```bash
go mod tidy
```

### Setup environment variables

Create a `.env` file in the root directory of the project and add the following environment variables:

```bash
DB="your-database-connection-string"
PORT="3000"
```

### Run the application

```bash
go run main.go
```

The application will be available at `http://localhost:3000`.