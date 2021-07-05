(function() {
	
	
    // Create the connector object
    var myConnector = tableau.makeConnector();
	

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.string
        },
		{
            id: "name",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "status",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "currency",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "created_at",
            dataType: tableau.dataTypeEnum.string
        }];


        var tableSchema = {
            id: "Orders",
            alias: "XPDELA Shopify Orders",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };
	
	

    

    // Download the data
    myConnector.getData = function(table, doneCallback) {
		
        $.getJSON("https://xpdela.myshopify.com/admin/api/2021-07/draft_orders.json",

      function(resp)

		{
            var feat = resp.draft_orders,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "id": feat[i].id,
					"name": feat[i].name,
					"status": feat[i].status,
					"currency": feat[i].currency,
					"created_at": feat[i].created_at
					
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };
	   

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
			            tableau.connectionName = "XPDELA Store Shopify"; // This will be the data source name in Tableau
			tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
