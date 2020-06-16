'use strict';
// declareUpdate(); // Note: uncomment if changing the database state

var lastTimestamp; // instance of xs.dateTime
var collection; // collection

let currentDateTime = fn.currentDateTime()

let timeQueryLower = cts.propertiesFragmentQuery(cts.elementRangeQuery(
    xs.QName('prop:last-modified'), '>',
    lastTimestamp))


let timeQueryUpper = cts.propertiesFragmentQuery(cts.elementRangeQuery(
    xs.QName('prop:last-modified'), '<=',
    currentDateTime))


let andQuery = cts.andQuery([timeQueryLower, timeQueryUpper])

if (collection && collection !== null) {
    andQuery = cts.andQuery([andQuery, cts.collectionQuery(collection)])
}

var response = {}
response.uris = cts.uris("", null, andQuery).toArray()
response.dateTime = currentDateTime
response.collection = collection

response