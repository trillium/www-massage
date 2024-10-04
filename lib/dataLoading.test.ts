import {
  dumpData,
  loadData,
  replaceLeadingUnderscoresWithSpaces,
} from "./dataLoading"
import yaml from "js-yaml"

describe("dataLoading tests", () => {
  describe("dumpData", () => {
    it("should return YAML string that contains underscores when objects are nested", () => {
      const obj = {
        key1: "value1",
        key2: "value2",
        nested: { nest1: { nest2: "2 nested" } },
      }
      const yamlString = yaml.dump(obj)
      const dumpStr = dumpData(obj)
      const replaceStr = replaceLeadingUnderscoresWithSpaces(dumpStr)
      expect(dumpStr).toContain("_")
      expect(replaceStr).toBe(yamlString)
    })

    it("should parse this string", () => {
      const obj = {
        allowedDurations: [15, 30],
        pricing: 120,
        eventContainer: "foo_EVENT__",
      }
      const dumpStr = dumpData(obj)
      const yamlString = yaml.dump(obj)
      const replaceStr = replaceLeadingUnderscoresWithSpaces(dumpStr)
      expect(replaceStr).toBe(yamlString)
    })
  })

  describe("loadData", () => {
    it("should encode and decode successfully", () => {
      const obj = {
        key1: "value1",
        key2: "value2",
        nested: { nest1: { nest2: "2 nested" } },
      }
      const dumpStr = dumpData(obj)
      const loadObj = loadData(dumpStr)
      const expectedObj = {
        key1: "value1",
        key2: "value2",
        nested: { nest1: { nest2: "2 nested" } },
      }
      expect(loadObj).toEqual(expectedObj)
    })
    it("should drop xml tags", () => {
      const xmlStr =
        "<pre><u></u><u></u><pre><u></u><u></u><pre><u></u><u></u><pre>eventName: mr_pasadena<br>eventContainerString: mr_pasadena__EVENT__<br>allowedDurations:<br>__- 15<br>__- 30<br>pricing:<br>__'15': 30<br>__'30': 60<br></pre></pre></pre></pre>"
      const loadObj = loadData(xmlStr)
      const expectedObj = {
        eventName: "mr_pasadena",
        eventContainerString: "mr_pasadena__EVENT__",
        allowedDurations: [15, 30],
        pricing: {
          "15": 30,
          "30": 60,
        },
      }
      expect(loadObj).toEqual(expectedObj)
    })
  })
})
