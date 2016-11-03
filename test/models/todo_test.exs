defmodule PeapDemo.TodoTest do
  use PeapDemo.ModelCase

  alias PeapDemo.Todo

  @valid_attrs %{status: "some content", task: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Todo.changeset(%Todo{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Todo.changeset(%Todo{}, @invalid_attrs)
    refute changeset.valid?
  end
end
