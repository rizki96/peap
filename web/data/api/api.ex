defmodule PeapDemo.Data.Api do

  import Ecto.Query
  
  alias PeapDemo.Todo
  alias PeapDemo.Repo

  def whoami(%{ user: user1 }, _input, %{ root_value: %{ user: user2 }}) do
    user2
  end

  def increment_counter(_source, %{ by: by }, _context) do
    IO.puts "increment_counter by: #{by}"
    current_value = PeapDemo.Counter.increment(by)
    if (by != 0), do: PeapDemo.Endpoint.broadcast "rooms:lobby", "current_count", %{body: current_value}
    %{ current_value: current_value }
  end

  def get_todos(%{ user: user1 }, _input, %{ root_value: %{ user: user2 }}) do
    IO.puts "get_todos of user_id: #{user2.id}"
    query = from(t in Todo, where: t.user_id == ^user2.id, order_by: [desc: t.id],)
    todos = Repo.all(query)
  end

  def add_todo(_source, %{ task: task, status: status }, %{ root_value: %{ user: user2 }}) do
    IO.puts "add_todo of task: #{task}, status: #{status}"
    todo = Repo.insert!(%Todo{task: task, status: status, user_id: user2.id})
    if (todo != nil), do: PeapDemo.Endpoint.broadcast "rooms:lobby", "todo_id", %{body: todo.id}
    todo
  end

  def update_todo(_source, %{ todo_id: todo_id, status: status }, %{ root_value: %{ user: user2 }}) do
    IO.puts "update_todo of todo_id: #{todo_id}, status: #{status}"
    todo = Repo.get!(Todo, todo_id)
    changeset = Todo.changeset(todo, %{status: status})
    updated_todo = Repo.update!(changeset)
    if (updated_todo != nil), do: PeapDemo.Endpoint.broadcast "rooms:lobby", "todo_id", %{body: updated_todo.id}
    updated_todo
  end

  def remove_todo(_source, %{ todo_id: todo_id }, %{ root_value: %{ user: user2 }}) do
    IO.puts "remove_todo of id: #{todo_id}"
    todo = Repo.delete!(%Todo{id: todo_id})
    if (todo != nil), do: PeapDemo.Endpoint.broadcast "rooms:lobby", "todo_id", %{body: todo.id}
    todo
  end

end
