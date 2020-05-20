# http-callout-hackaton

## MVP Goal:

User AWS Step Function to define a workflow with 3 "simple" steps:

- HTTP request to DHS 1
- process response
- HTTP requesto to DHS 2

### Stretch goal:

- Ingest data from S3
- Use AWS Step Function to
    - initiate data ingest on DHS 1
    - initiate a harmonize flow on DHS 1 that will prepare requests for DHS 2
    - read DHS 1 requests
    - process
    - based on the requests, get data from DHS 2
    - put response back into DHS 1
    


## Protocol

- Set up 2 DHS services
    -    Public access
    -    Dev instances
- Create/access AWS account
    - Create State Machine using AWS StepFunctions
    - Create 1 Lambda function to GET data from DHS1
    - Create 1 Lambda function to PUT data to DHS2
    - Add Lambda URNs to the State Machine definition
- Diagrams
    - "as-is" state
    - "to-be" state
