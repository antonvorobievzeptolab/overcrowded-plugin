// Overcrowded After Effects CrowdMaker
{
    function myScript(thisObj) {
        function myScript_buildUI(thisObj) {
            var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "🤡 OCrowdMaker 🤡", undefined, { resizeable: true, closeButton: true });

            var description = myPanel.add("statictext", undefined, "🤡 OCrowdMaker 🤡 v0.01 by tony v");
            var makeCrowdButton = myPanel.add("button", undefined, "Select the CSV file");
            makeCrowdButton.alignment = ["fill", "center"];
            var description3 = myPanel.add("statictext", undefined, "Crowd progress")
            var crowdProgressBar = myPanel.add("progressbar", undefined, 0, 100);
            crowdProgressBar.alignment = ["fill", "center"];

            var files = new File;
            var csvFile = new File;

            myPanel.layout.layout(true);

            myPanel.onResizing = myPanel.onResize = function () {
                this.layout.resize();
            };

            makeCrowdButton.onClick = function () {
                app.beginUndoGroup("Create the crowd");

                csvFile = csvFile.openDlg("Select the CSV file", "CSV:*.csv", false);
                var comp = app.project.items.addComp("VisitorsPhysicsImport", 1920, 1920, 1, 60, 30);
                csvFile.open("r");
                //crowdProgressBar.maxvalue = 210;
                var currentRow = 0;
                var csvRowString = "";
                var rowData = [];
                var solidLayers = [];
                do {
                    currentRow = currentRow + 1;
                    crowdProgressBar.value = currentRow;
                    csvRowString = csvFile.readln();
                    rowData = csvRowString.split(",");
                    while (solidLayers.length < parseInt(rowData[0]) + 1) {
                        var name = "visitor_" + rowData[0];
                        var solidLayer = comp.layers.addSolid([1, 1, 1], name, 25, 25, 1, comp.duration);
                        solidLayers.push(solidLayer);
                    }
                    solidLayers[parseInt(rowData[0])].position.setValueAtTime(parseInt(rowData[1]) / 30, [comp.width / 2 + 40 * parseFloat(rowData[2]), comp.height / 2 - 40 * parseFloat(rowData[3])]);
                } while (!csvFile.eof);

                csvFile.close();
                app.endUndoGroup();
            }

            myPanel.layout.layout(true);
            return myPanel;
        }

        var myScriptPal = myScript_buildUI(thisObj);

        if (myScriptPal != null && myScriptPal instanceof Window) {
            myScriptPal.center();
            myScriptPal.show();
        }
    }
    myScript(this);
}
