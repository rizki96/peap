defmodule PeapDemo.Todo do
  use PeapDemo.Web, :model

  schema "todos" do
    field :task, :string
    field :status, :string
    belongs_to :user, PeapDemo.User

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:task, :status])
    #|> validate_required([:task, :status])
  end
end
