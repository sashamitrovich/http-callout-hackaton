const DataHub = require("/data-hub/5/datahub.sjs");
var gHelper  = require("/custom-modules/pipes/graphHelper")
const datahub = new DataHub();


function getGraphDefinition() {
  return {"models":[],"executionGraph":{"last_node_id":7,"last_link_id":8,"nodes":[{"id":2,"type":"DHF/output","pos":[1338,439],"size":[180,160],"flags":{},"order":6,"mode":0,"inputs":[{"name":"output","type":0,"link":6}],"properties":{}},{"id":3,"type":"Format/stringPadding","pos":[807,372],"size":{"0":255,"1":106},"flags":{},"order":3,"mode":0,"inputs":[{"name":"input","type":0,"link":3}],"outputs":[{"name":"output","links":[4]}],"properties":{},"widgets_values":["60","right","#"]},{"id":5,"type":"DHF/envelope","pos":[1000,579],"size":[180,160],"flags":{},"order":5,"mode":0,"inputs":[{"name":"headers","type":0,"link":null},{"name":"triples","type":0,"link":null},{"name":"instance","type":0,"link":4},{"name":"attachments","type":0,"link":5},{"name":"uri","type":0,"link":8},{"name":"collections","type":0,"link":null}],"outputs":[{"name":"output","type":null,"links":[6]}],"properties":{},"widgets_values":["json"]},{"id":1,"type":"DHF/input","pos":[248,489],"size":[180,60],"flags":{},"order":0,"mode":0,"outputs":[{"name":"input","type":"","links":[5]},{"name":"uri","type":"","links":[]},{"name":"collections","type":"","links":null}],"properties":{}},{"id":4,"type":"Generate/multiConstant","pos":[478,340],"size":{"0":255,"1":82},"flags":{},"order":1,"mode":0,"outputs":[{"name":"output","links":[3]}],"properties":{},"widgets_values":["string","dddd"]},{"id":6,"type":"Generate/uuid","pos":[252,634],"size":{"0":255,"1":58},"flags":{},"order":2,"mode":0,"outputs":[{"name":"uuid","links":[7]}],"properties":{},"widgets_values":[""]},{"id":7,"type":"Generate/Templating","pos":[617.1690569790926,624.6335900677136],"size":{"0":255,"1":146},"flags":{},"order":4,"mode":0,"inputs":[{"name":"v1","type":0,"link":7},{"name":"v2","type":0,"link":null},{"name":"v3","type":0,"link":null}],"outputs":[{"name":"newString","links":[8]}],"properties":{},"widgets_values":["","","/test/${v1}.json"]}],"links":[[3,4,0,3,0,0],[4,3,0,5,2,0],[5,1,0,5,3,0],[6,5,0,2,0,0],[7,6,0,7,0,0],[8,7,0,5,4,0]],"groups":[],"config":{},"version":0.4}}}

function main(content, options) {
  //grab the doc id/uri
  let id = content.uri;

  //here we can grab and manipulate the context metadata attached to the document
  let context = content.context;

  //let's set our output format, so we know what we're exporting
  let outputFormat = options.outputFormat ? options.outputFormat.toLowerCase() : datahub.flow.consts.DEFAULT_FORMAT;

  //here we check to make sure we're not trying to push out a binary or text document, just xml or json
  if (outputFormat !== datahub.flow.consts.JSON && outputFormat !== datahub.flow.consts.XML) {
    datahub.debug.log({
      message: 'The output format of type ' + outputFormat + ' is invalid. Valid options are ' + datahub.flow.consts.XML + ' or ' + datahub.flow.consts.JSON + '.',
      type: 'error'
    });
    throw Error('The output format of type ' + outputFormat + ' is invalid. Valid options are ' + datahub.flow.consts.XML + ' or ' + datahub.flow.consts.JSON + '.');
  }

  /*
  This scaffolding assumes we obtained the document from the database. If you are inserting information, you will
  have to map data from the content.value appropriately and create an instance (object), headers (object), and triples
  (array) instead of using the flowUtils functions to grab them from a document that was pulled from MarkLogic.
  Also you do not have to check if the document exists as in the code below.

  Example code for using data that was sent to MarkLogic server for the document
  let instance = content.value;
  let triples = [];
  let headers = {};
   */

  //Here we check to make sure it's still there before operating on it
  if (!fn.docAvailable(id)) {
    datahub.debug.log({message: 'The document with the uri: ' + id + ' could not be found.', type: 'error'});
    throw Error('The document with the uri: ' + id + ' could not be found.')
  }

  //grab the 'doc' from the content value space
  let doc = content.value;

  // let's just grab the root of the document if its a Document and not a type of Node (ObjectNode or XMLNode)
  //if (doc && (doc instanceof Document || doc instanceof XMLDocument)) {
  //  doc = fn.head(doc.root);
  //}

  /*
  //get our instance, default shape of envelope is envelope/instance, else it'll return an empty object/array
  let instance = datahub.flow.flowUtils.getInstance(doc) || {};

  // get triples, return null if empty or cannot be found
  let triples = datahub.flow.flowUtils.getTriples(doc) || [];

  //gets headers, return null if cannot be found
  let headers = datahub.flow.flowUtils.getHeaders(doc) || {};

  //If you want to set attachments, uncomment here
  // instance['$attachments'] = doc;
  */

  //insert code to manipulate the instance, triples, headers, uri, context metadata, etc.
  let results = gHelper.executeGraphStep(doc,id,getGraphDefinition(),{collections: xdmp.documentGetCollections(id)})
return results;
}

module.exports = {
  main: main
};