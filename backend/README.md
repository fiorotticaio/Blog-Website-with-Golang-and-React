# Blog Website - Golang API

## Getting Started

### Create a mysql database

- Use app xampp to create a mysql database and start the server
- Access the database in your browser by going to `http://localhost/phpmyadmin`
- Create a new database named `goblog`


## Project setup

### Requirements

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

### Create upload folder

Create an empty folder in the project root named '<strong>uploads</strong>'

### Run the application

In production (where the changes on the backend files wont trigger a new restart on server) just run:
```bash
go run main.go
```

For development, run:
```bash
air
```

The application will be available at `http://localhost:3000`.
