(() => {

  let _entryInitialized = false;
  let _disableEntryTracking = false;

  function getGlobal() {
    return window;
  }

  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  function supportsPerformanceGetEntries() {
    let result = false;

    const _global = getGlobal();
    result = _global
      && _global.performance
      && _global.performance.getEntries
      && _global.performance.setResourceTimingBufferSize;

    return !!result;
  }

  function instrumentEntry() {
    if (supportsPerformanceGetEntries() && !_disableEntryTracking && !_entryInitialized) {

      performance.setResourceTimingBufferSize(Number.MAX_VALUE);

      const mark = "__mark__";

      setInterval(function () {
        const allEntries = performance.getEntries();
        const nonMarked = allEntries.filter(e => !e[mark]);
        for (let i = 0; i < nonMarked.length; i += 1) {
          nonMarked[i][mark] = true;
          processEntry(nonMarked[i]);
        }
      }, 1000);

      _entryInitialized = true;
    }
  }

  function processEntry(entry) {

    if (entry.entryType === "paint") {
      appInsights.trackMetric({ name: entry.name, average: entry.startTime });
      return;
    }

    const dependency = {
      duration: entry.duration || entry.startTime,
      id: `|${uuidv4()}.${uuidv4()}.`,
      method: entry.initiatorType || entry.entryType,
      name: entry.name,
      properties: { entry },
      responseCode: 200, // TODO - we need to understand if there is a way to get this data
      startTime: new Date(performance.timing.connectStart + entry.startTime),
      success: true, // TODO - we need to understand if there is a way to get this data
      target: entry.name,
      type: entry.initiatorType || entry.entryType,
    };
    appInsights.trackDependencyData(dependency);
  }

  instrumentEntry();

})();