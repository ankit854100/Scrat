import * as Blockly from "blockly/core";
import "blockly/javascript";
import down from "./Images/down-arrow.svg";
import up from "./Images/up-arrow.svg";
import rigth from "./Images/right-arrow.svg";
import play from "./Images/play.svg";
import leftArrow from "./Images/left-arrow.svg";

// when run block
Blockly.Blocks["when_run"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("when run")
      .appendField(new Blockly.FieldImage(play, 20, 18, "*"));
    this.setNextStatement(true, null);
    this.setColour("#4C97FF");
    this.setTooltip("");
    this.setHelpUrl("http://www.example.com/");
  }
};

Blockly.JavaScript["when_run"] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "";
  return code;
};

// South block
Blockly.Blocks["south"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("S")
      .appendField(new Blockly.FieldImage(down, 20, 18, "*"));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#4C97FF");
    this.setTooltip("");
    this.setHelpUrl("http://www.example.com/");
  }
};

Blockly.JavaScript["south"] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "await canvas.south();";
  return code;
};

// North block
Blockly.Blocks["north"] = {
  init: function () {
    this.setColour("#4C97FF");
    this.appendDummyInput()
      .appendField("N")
      .appendField(new Blockly.FieldImage(up, 20, 18, "*"));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
    this.setHelpUrl("http://www.example.com/");
  }
};

Blockly.JavaScript["north"] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "await canvas.north();";
  return code;
};

// west arrow
Blockly.Blocks["west"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("W")
      .appendField(new Blockly.FieldImage(leftArrow, 20, 18, "*"));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#4C97FF");
    this.setTooltip("");
    this.setHelpUrl("http://www.example.com/");
  }
};

Blockly.JavaScript["west"] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "await canvas.west();";
  return code;
};

// east block
Blockly.Blocks["east"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("E")
      .appendField(new Blockly.FieldImage(rigth, 20, 18, "*"));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#4C97FF");
    this.setTooltip("");
    this.setHelpUrl("http://www.example.com/");
  }
};

Blockly.JavaScript["east"] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "await canvas.east();\n";
  return code;
};
