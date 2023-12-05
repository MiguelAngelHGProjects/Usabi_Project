class PlaylistsController < ApplicationController
  before_action :set_playlist, only: %i[show edit update destroy]

  # GET /playlists or /playlists.json
  def index
    @playlists = Playlist.all
    render json: @playlists
  end

  # GET /playlists/1 or /playlists/1.json
  def show
    render json: playlist_response_data(@playlist)
  end

  # GET /playlists/new
  def new
    @playlist = Playlist.new
  end

  # GET /playlists/1/edit
  def edit
  end

  # POST /playlists or /playlists.json
  def create
    @playlist = Playlist.new(playlist_params)

    if @playlist.save
      render json: playlist_response_data(@playlist), status: :created, location: playlist_url(@playlist)
    else
      render json: { error: 'Failed to create playlist', details: @playlist.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /playlists/1 or /playlists/1.json
  def update
    if @playlist.update(playlist_params)
      render json: playlist_response_data(@playlist), status: :ok, location: playlist_url(@playlist)
    else
      render json: { error: 'Failed to update playlist', details: @playlist.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /playlists/1 or /playlists/1.json
  def destroy
    if @playlist.destroy
      render json: { message: 'Playlist deleted successfully' }, status: :ok
    else
      render json: { error: 'Failed to delete playlist', details: @playlist.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def playlist_response_data(playlist)
    {
      id: playlist.id,
      PlaylistOrder: playlist.PlaylistOrder,
      WorkAutor: playlist.WorkAutor,
      WorkName: playlist.WorkName,
      WorkDuration: playlist.WorkDuration,
    }
  end

  def set_playlist
    @playlist = Playlist.find(params[:id])
  end

  def playlist_params
    params.require(:playlist).permit(:PlaylistOrder, :WorkAutor, :WorkName, :WorkDuration)
  end
end
