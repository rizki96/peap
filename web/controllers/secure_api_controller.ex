defmodule PeapDemo.SecureApiController do
  use PeapDemo.Web, :controller

  alias PeapDemo.Data

  def whoami(conn, _params) do
    query = "{whoami { id, name, email }}"
    { :ok, result } = Data.execute(query, conn)
    json conn, result
  end

  def get_todos(conn, _params) do
    user = Guardian.Plug.current_resource(conn)
    result = %{}
    query = "{get_todos(user: #{user.id}) { id, task, status }}"
    { :ok, result } = Data.execute(query, conn)
    json conn, result
  end

end
