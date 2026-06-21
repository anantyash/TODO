const baseURL = import.meta.env.VITE_API_URL;

export class Service {
  constructor() {
    this.baseURL = baseURL;
  }

  async getTodos() {
    try {
      // console.log("Run this ");
      const res = await fetch(`${this.baseURL}/todos/`);
      // console.log("Res:", res);
      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }
      return res.json();
    } catch (error) {
      throw new Error("Failed to fetch");
    }
  }

  async addTodo(todo) {
    try {
      const res = await fetch(`${this.baseURL}/todos/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      if (!res.ok) {
        throw new Error(`HTTP Errow: ${res.status}`);
      }
      return res.json();
    } catch (error) {
      throw new Error(`Request failed: ${error.message}`);
    }
  }

  async updateTodo(id, data) {
    try {
      const res = await fetch(`${this.baseURL}/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error(`HTTP Errow: ${res.status}`);
      }
      return res.json();
    } catch (error) {
      throw new Error(`Request failed: ${error.message}`);
    }
  }

  async toggleTodo(id) {
    try {
      const res = await fetch(`${this.baseURL}/todos/${id}/toggle`, {
        method: "PATCH",
      });
      if (!res.ok) {
        throw new Error(`HTTP Errow: ${res.status}`);
      }
      return res.json();
    } catch (error) {
      throw new Error(`Request failed: ${error.message}`);
    }
  }

  async deleteTodo(id) {
    try {
      const res = await fetch(`${this.baseURL}/todos/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(`HTTP Errow: ${res.status}`);
      }
      return true;
    } catch (error) {
      throw new Error(`Request failed: ${error.message}`);
    }
  }
}

const service = new Service();
export default service;
