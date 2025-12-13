class Project {
    #projectData = [];
  constructor(requiredFields, optionalFields = []) {
      this.requiredFields = requiredFields
      this.optionalFields = optionalFields
  }

  isRequiredFieldSatisfied (data) {
    return Object.values(this.requiredFields).every(
      (info) => info !== null && info !== undefined && info !== ""
    );
  }
    
    allProjectData () {
        const allData = { ...this.requiredFields, ...this.optionalFields }
        this.#projectData = allData
        return allData
    }
    
    async addToJsonFile () {
        const allData = allProjectData();
        const fs = new FileSystemDirectoryReader()
        await fs.readEntries.name()
    }
    
}

module.exports = Project
