# My Node API

This project is a simple Node.js API that allows users to fetch address information based on a Brazilian postal code (CEP).

## Getting Started

To get started with this API, follow the instructions below.

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/my-node-api.git
   ```

2. Navigate to the project directory:

   ```
   cd my-node-api
   ```

3. Install the dependencies:

   ```
   npm install
   ```

### Running the API

To start the server, run the following command:

```
npm start
```

The server will start on `http://localhost:3000`.

### API Endpoint

The API exposes a single endpoint to fetch address information by CEP:

```
GET /cep/:cep
```

#### Parameters

- `cep`: The postal code you want to look up (e.g., 01001-000).

#### Example Request

```
GET http://localhost:3000/cep/01001-000
```

#### Example Response

```json
{
  "cep": "01001-000",
  "logradouro": "Praça da Sé",
  "complemento": "lado ímpar",
  "bairro": "Sé",
  "localidade": "São Paulo",
  "uf": "SP",
  "ibge": "3550308",
  "gia": "1004",
  "ddd": "11",
  "siafi": "7087"
}
```

### Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements for the project.

### License

This project is licensed under the MIT License.