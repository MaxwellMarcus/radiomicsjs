// Too Add
const getFeatureClasses = () => {}

let geometryTolerance = null;

class GeneralInfo {
  constructor() {
    this.generalInfo_prefix = "diagnostics_";

    this.generalInfo = {};
  }

  getGeneralInfo() {
    return this.genralInfo;
  }

  addImageElements(image, prefix="original") {
    if (prefix == "original") {
      // this.generalInfo[this.generalInfo_prefix + "Image-original_Hash"]
    }
  }
}

class FeatureExtractor {
  constructor(params, overrides) {
    this.settings = {};
    this.enabledImagetypes = {};
    this.enabledFeatures = {};

    this.featureClassNames = list(Object.keys(getFeatureClasses()));

    if (settings.paramsDict !== undefined){
      console.log("Loading parameter object");
      this._applyParams(settings.paramsDict);
    }
    // Paramaters from files not implemented yet

    //else if (settings.paramsFile !== undefined) {
      // console.log(`Loading parameter file ${settings.paramsFile}`);
      // this._applyParams(settings.paramsFile);
    // }
   else {
      this.settings = this._getDefaultSettings();
      console.log(`No valid config parameter, using defaults: ${this.settings}`);

      this.enabledImagetypes = {Original: {}};
      console.log(`Enabled image types: ${this.enabledImagetypes}`);

      for (featureClassName of this.featureClassNames) {
        if (featureClassName == "shape2D") {
          continue;
        }
        this.enabledFeatures[featureClassName] = [];
      }

      console.log(`Enabled features: ${this.enabledFeatures}`);
    }

    console.log(`Applying custom setting overrides: ${overrides}`);
    Object.assign(this.settings, overrides);
    console.log(`Settings: ${this.settings}`);

    if (this.settings.binCount !== undefined) {
      console.warn("Fixed bin Count enabled! However, we recommend using a fixed bin Width. See http://pyradiomics.readthedocs.io/en/latest/faq.html#radiomics-fixed-bin-width for more details");
    }

    this._setTolerance();
  }

  _setTolerance() {
    geometryTolerance = this.settings.geometryTolerance;
    // Set ITK Tolerance
  }

  addProvenance(provenance_on=true) {
    this.settings.additionalInfo = provenance_on;
  }

  _getDefaultSettings() {
    return {minimumROIDimensions: 2,
            minimumROISize: null,
            normalize: false,
            normalizeScale: 1,
            removeOutliers: null,
            resampledPixelSpacing: null,
            interpolator: "sitkBSpline",
            preCrop: false,
            padDistance: 5,
            distances: [1],
            force2D: false,
            force2Ddimension: 0,
            resegmentRange: null,
            label: 1,
            additionalInfo: true};
  }

  _applyParams(params) {
    const enabledImageTypes = params.imageType;
    const enabledFeatures = params.enabledFeatures;
    const settings = params.settings;
    const voxelSettings = params.voxelSettings;

    console.log("Applying settings");

    if (enabledImageTypes.length == 0) {
      this.enabledImagetypes = {Original: {}};
    } else {
      this.enabledImagetyeps = enabledImageTypes;
    }

    console.log(`Enabled image types: ${this.enabledImagetypes}`);

    if (enabledFeatures.length == 0) {
      this.enabledFeatures = {};
      for (featureClassName of this.featureClassNames) {
        this.enabledFeatures[featureClassName] = [];
      }
    } else {
      this.enabledFeatures = enabledFeatures;
    }

    console.log(`Enabled features: ${this.enabledFeatures}`);

    this.settings = this._getDefaultSettings();
    Object.assign(this.settings, settings);
    Object.assign(this.settings, voxelSettings);

    console.log(`Settings: ${settings}`);
  }

  // loadParams(paramsFile) {
  //   this._applyParams(paramsFile)
  // }

  execute(image, mask, label=null, last_channel=null, voxelBased=false) {
    const _settings = Object.assign({}, this.settings);

    const tolerance = _settings.geometryTolerance;
    const additionalInfo = _settings.additionalInfo;
    const resegmentShape = _settings.resegmentShape;

    if (label !== null) {
      _settings.label = label;
    } else {
      label = _settings.label;
    }

    if (label_channel !== null) {
      _settings.label_channel = label_channel;
    }

    if (geometryTolerance != tolerance) {
      this._setTolerance();
    }

    if (additionalInfo) {
      const general
    }
  }
}
