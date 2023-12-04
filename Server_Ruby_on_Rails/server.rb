# app/controllers/items_controller.rb
class ItemsController < ApplicationController
    before_action :set_items
  
    def index
      render json: @items
    end
  
    def create
      new_item = params.require(:item).permit(:keywords, :description, :image, :latitude, :longitude, :date_start, :date_end)
      @items[new_item[:id]] = new_item
      render status: :created
    end
  
    def destroy
      item_id = params[:id].to_i
      @items.delete(item_id)
      head :no_content
    end
  
    private
  
    def set_items
      @items ||= {
        1 => {
          "id" => 1,
          "keywords" => ["saw", "wood", "tools"],
          "description" => "A saw and wood",
          "image" => "https://placekitten.com/200/300",
          "latitude" => 37.38797546109132,
          "longitude" => -122.05688209785687,
          "date_start" => Time.current.iso8601,
          "date_end" => Time.current.iso8601,
        }
      }
    end
  end
  