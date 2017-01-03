defmodule PeapDemo.ApiController do
  use PeapDemo.Web, :controller

  import Ecto.Query
  alias PeapDemo.User
  alias PeapDemo.Repo
  alias Comeonin.Bcrypt

  def create_token(conn, params) do
    email = params["email"]
    password = params["password"]
    user = from(u in User, where: u.email == ^email)
      |> Repo.one
    if user == nil do
      send_unauthorized conn
    else
      hash = user.password_hash
      if Bcrypt.checkpw(password, hash) do
        { :ok, jwt, _full_claims } = Guardian.encode_and_sign(user, :token)
        json conn, %{ token: jwt }
      else
        send_unauthorized conn
      end
    end
  end

  def send_broadcast(conn, params) do
    message = params["message"]
    PeapDemo.Endpoint.broadcast "rooms:lobby", "new_message", %{user: "CLI", body: message}
    json conn, %{ result: "ok" }
  end

  def test_user_api(conn, _params) do
    users = 
      from(u in User, order_by: [desc: u.id])
      |> Repo.all
    #users_query = from(u in User, order_by: [desc: u.id])
    #users = Repo.all(users_query)
    #IO.puts inspect(users)
    json conn, %{ result: users }
  end

  def test_nodb_api(conn, _params) do
    json conn, %{ result: "ok" }
  end

  defp send_unauthorized(conn) do
    conn
    |> put_status(401)
    |> json(%{ error: "Unauthorized" })
  end

end
